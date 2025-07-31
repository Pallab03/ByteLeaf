const Problem = require("../models/problem");
const SolutionVideo = require("../models/solutionVideo");
const Submission = require("../models/submission");
const User = require("../models/user");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");

const createProblem = async (req, res) => {

    const { title, description, difficulty, tags
        , visibleTestCases, hiddenTestCases, startCode
        , referenceSolution, problemCreator } = req.body;

    try {
        for (const { language, completeCode } of referenceSolution) {
            //source_code:
            //language_id:
            //stdin:
            //expected_output: 

            const languageId = getLanguageById(language);


            //creating Batch Submission
            const submissions = visibleTestCases.map((testcase) => ({

                source_code: completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output

            }));

            const submitResult = await submitBatch(submissions);

            const resultToken = submitResult.map((value) => value.token);

            const testResult = await submitToken(resultToken);


            for (const test of testResult) {
                if (test.status_id != 3) {
                    
                    return res.status(401).send("Error Occured");
                }
            }

        }
        //now we an store in our db


        const userProblem = await Problem.create({
            ...req.body,
            problemCreator: req.result._id
        });


        res.status(201).send("Problem Saved Successfully .")

    } catch (err) {
        res.status(401).send("Error : " + err)
    }

}

const updateProblem = async (req,res) => {
    const {id} = req.params;
    const {title,description,difficulty,tags
        ,visibleTestCases,hiddenTestCases,startCode
        ,referenceSolution,problemCreator} = req.body;


    try {
        if (!id) {
            return res.status(400).send("Invalid ID!");
        }
        const DsaProblem = await Problem.findById(id);
        if (!DsaProblem) {
            return res.status(400).send("Invalid ID!");
        }

        for (const { language, completeCode } of referenceSolution) {
            //source_code:
            //language_id:
            //stdin:
            //expected_output: 

            const languageId = getLanguageById(language);


            //creating Batch Submission
            const submissions = visibleTestCases.map((testcase) => ({

                source_code: completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output

            }));

            const submitResult = await submitBatch(submissions);

            const resultToken = submitResult.map((value) => value.token);

            const testResult = await submitToken(resultToken);


            for (const test of testResult) {
                if (test.status_id!= 3) {
                    return res.status(400).send("Error Occured");
                }
            }

        }

        const newProblem = await Problem.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true })

        res.status(200).send(newProblem)
    }
    catch (err) {
        res.status(500).send("Error: " + err);

    }
}

const deleteProblem = async (req, res) => {
    const { id } = req.params

    try {
        if (!id) {
            return res.status(400).send("Invalid ID!");
        }

        const deletedProblem = await Problem.findByIdAndDelete(id);
        if (!deletedProblem)
            return res.status(404).send("Problem is Missing");


        res.status(200).send("Successfully Deleted");

    }
    catch (err) {
        res.status(500).send("Error: " + err);
    }
}

const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).send("Invalid ID!");
        }

        //we gave user's, only those fields
        const getProblem = await Problem.findById(id).select('title description difficulty tags visibleTestCases startCode referenceSolution');
        
        
        if (!getProblem)
            return res.status(404).send("Problem is Missing");
        
        const videos = await SolutionVideo.findOne({problemId:id});

        if(videos){    

            const responseData ={
            ...getProblem.toObject(),
            secureUrl : videos.secureUrl,
            thumbnailUrl:videos.thumbnailUrl,
            duration:videos.duration
            } 
            

            return res.status(200).send(responseData);
        }

        res.status(200).send(getProblem);

    }
    catch (err) {
        res.status(500).send("Error: " + err);

    }
}
//gat All Problem
const getAllProblem = async (req, res) => {
    try {

        const getAllProblem = await Problem.find({}).select('_id title difficulty tags');
        if (getAllProblem.length==0)
            return res.status(404).send("Problem is Missing");


        res.status(200).send(getAllProblem);

    }
    catch (err) {
        res.status(500).send("Error: " + err);

    }
}

//get paginated problems
const getPaginatedProblems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      // Page number
    const limit = parseInt(req.query.limit) || 5;    // Problems per page
    const skip = (page - 1) * limit;

    const total = await Problem.countDocuments();

    const problems = await Problem.find({})
      .select('_id title difficulty tags')
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      problems,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProblems: total
    });
  } catch (err) {
    console.error("Pagination error:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};


const solveAllProblemByUser = async (req,res)=>{
    try{
        const userId= req.result._id;
        const user= await User.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        });
        res.status(200).send(user.problemSolved);
    }
    catch(err){
        res.status(500).send("Error: " + err);

    }
}
const submittedProblem = async (req,res)=>{
    try{
        const problemId= req.params.pid;
        const userId=req.result._id;

        const ans= await Submission.find({userId,problemId});
        //for resolve the error comments the next two lines
        if(ans.length==0)
            return res.status(200).send("Submission is Not Present .");
        res.status(200).send(ans);
    }catch(err){
        res.status(500).send("Internl Server Error : "+err);
    }
}



module.exports = { createProblem, updateProblem, deleteProblem, getProblemById, getAllProblem, solveAllProblemByUser,submittedProblem,getPaginatedProblems };