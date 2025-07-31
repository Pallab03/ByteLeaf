const Problem = require("../models/problem");
const Submission = require("../models/submission");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");

const submitCode= async(req,res)=>{
    try{
        const userId= req.result._id;
        const problemId=req.params.id;
        let {code,language}= req.body;

        if(!userId||!code||!language||!problemId)
            return res.status(400).send("Some Field missing!")
        //Fetch the data from Database

        if(language==='cpp')
            language='c++'
      

        const problem= await Problem.findById(problemId);
        const submittedResult= await Submission.create({
            userId,
            problemId,
            code,
            language,
            status:"pending",
            testCasesTotal:problem.hiddenTestCases.length

        })

        //submit the code on judge0

        const languageId = getLanguageById(language);
        const submissions = problem.hiddenTestCases.map((testcase) => ({

                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output

        }));

        const submitResult = await submitBatch(submissions);

        const resultToken = submitResult.map((value) => value.token);

        const testResult = await submitToken(resultToken);

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = 'accepted';
        let errorMessage = null;
        
        for(const test of testResult)
        {
            if(test.status_id==3){
                testCasesPassed++;
                runtime+=parseFloat(test.time);
                memory= Math.max(memory,test.memory);
            }else{
                if(test.status_id==4)
                {
                    status="Error";
                    errorMessage = test.stderr;
                }else{
                    status="Wrong"
                    errorMessage = test.stderr;
                }
            }
        }

        // Store the result in Database in Submission
        submittedResult.status   = status;
        submittedResult.testCasesPassed = testCasesPassed;
        submittedResult.errorMessage = errorMessage;
        submittedResult.runtime = runtime;
        submittedResult.memory = memory;

        await submittedResult.save();

        //insert ProblemID in userSechema.problemSolved if problremID is not present There

        if(!req.result.problemSolved.includes(problemId)){
            req.result.problemSolved.push(problemId);
            await req.result.save();
        }

        const accepted = (status == 'accepted')
        res.status(201).json({
        accepted,
        totalTestCases: submittedResult.testCasesTotal,
        passedTestCases: testCasesPassed,
        runtime,
        memory
        });
       
    }   
    catch(err){
        res.status(500).send("Internal Server Error "+ err);
    }
}

const runCode= async (req,res)=>{

    try{
        const userId= req.result._id;
        const problemId=req.params.id;
        let {code,language}= req.body;

        if(!userId||!code||!language||!problemId)
            return res.status(400).send("Some Field missing!")
        //Fetch the prblem data from Database

        const problem= await Problem.findById(problemId);
        //submit the code on judge0
        if(language==='cpp')
        language='c++'


        const languageId = getLanguageById(language);
        const submissions = problem.visibleTestCases.map((testcase) => ({

                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output

        }));

        const submitResult = await submitBatch(submissions);

        const resultToken = submitResult.map((value) => value.token);

        const testResult = await submitToken(resultToken);

        
        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = true;
        let errorMessage = null;

    for(const test of testResult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = false
            errorMessage = test.stderr
          }
          else{
            status = false
            errorMessage = test.stderr
          }
        }
    }

   
  
    res.status(201).json({
        success:status,
        testCases: testResult,
        runtime,
        memory
    });
        

    }   
    catch(err){
        res.status(500).send("Internal Server Error "+ err);
    }
}

module.exports={submitCode,runCode};