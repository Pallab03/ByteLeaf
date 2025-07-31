import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { useEffect,useState } from 'react';
import { registerUser } from '../autnSlice';
import { Lock, UserCircle } from 'lucide-react';
import { UserPlus, Menu, Home, Info, Phone ,User,Mail,Loader} from "lucide-react";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import FloatingShape from '../components/FloatingShape';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const signupSchema = z.object({
    firstName:z.string().min(3,"First Name Should contain atleast 3 char "),
    emailId: z.string().email("Invalid EmailId"),
    password:z.string().min(8,"Password Should contain atleast 8 char "),
    lastName:z.string().min(0,""),
});

function Signup(){
    const [showPassword,setShowPassword]= useState(false);
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [password, setPassword] = useState("");
    const {isAuthenticated,loading,error}= useSelector((state)=>state.auth)

    
   

    const {register, handleSubmit,watch, formState: { errors }, } = useForm({resolver:zodResolver(signupSchema)});

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/');
        }
    },[isAuthenticated,navigate])

    const submittedData= async (data)=>{
        const r= await dispatch(registerUser(data));
        
        if(r.error)
           return toast.error(r.payload.response.data);
        navigate('/verify-email', { state: { showToast: true } });
    }



useEffect(() => {
setPassword(watch('password'));

}, [watch('password')]); // Triggers only when password changes



    return (


            <div className='min-h-screen bg-gradient-to-br
            from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
			<FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
            
            <motion.div
            initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full  bg-gray-800/40  backdrop-filter backdrop-blur-xl rounded-2xl shadow-[21px_20px_18px_0px_rgba(15,_15,_15,_0.56)]
			overflow-hidden'
            
            >


                   
             
                <div className='p-8 w-full '>
                     
				<h2 className='text-3xl h-auto font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Create Account
				</h2>
                    <form onSubmit={handleSubmit(submittedData)} >
                        {/* name */}
                        {errors.firstName && (
                        <span className="text-error ml-2 mb-1 text-xs font-semibold">{errors.firstName.message}</span>
                        )}
                        <div className='relative mb-6'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <User className='size-5 text-green-500' />
                        </div>
                        <input
                            className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 '
                            type="text"
                            placeholder="Enter your First Name"
                            // className={`input  input-bordered ${errors.firstName && 'input-error'}`}
                            {...register('firstName')}
                        />
		                </div>
                     
                        
                        {/* Last name */}
                        <div className={`relative ${errors.emailId?'mb-2': 'mb-6'}`}>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <User className='size-5 text-green-500' />
                        </div>
                        <input
                            className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
                            type="text"
                            placeholder="Enter your Last Name"
                            // className={`input  input-bordered ${errors.firstName && 'input-error'}`}
                            {...register('lastName')}
                        />
		                </div>
                        {/* Email ID */}
                        {errors.emailId && (
                        <span className="text-error ml-2 mb-1 text-xs font-semibold">{errors.emailId.message}</span>
                        )}
                        <div className='relative mb-6'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <Mail className='size-5 text-green-500' />
                        </div>
                        <input
                            className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
                            type="email"
                            placeholder="Enter your Valid EmailID"
                            // className={`input  input-bordered ${errors.firstName && 'input-error'}`}
                            {...register('emailId')}
                        />
		                </div>
                        {/* Paassword */}
                        <div className='relative mb-6'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <Lock className='size-5 text-green-500' />
                        </div>
                        <input
                            className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            // value={password}
                            // onChange={(e)=>setPassword(e.target.value)}
                            // className={`input  input-bordered ${errors.firstName && 'input-error'}`}
                            {...register('password')}
                        />
                        {/* eye button */}
                        <button
                        type="button"
                        className="absolute top-1/2 z-10 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 outline-0 cursor-pointer" // Added transform for better centering, styling
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
                        >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                        </button>
		                </div>

                        {/* password Strength Meter */}

                        <PasswordStrengthMeter password={password}/>

                        <motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600 cursor-pointer
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={loading}
					>
						{loading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
					</motion.button>
                       

                    </form>
                    
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 w-f flex justify-center'>
                            <p className='text-m text-gray-400'>
                                Already have an account?{" "}
                                <NavLink to={"/login"} className='text-green-400 hover:underline'>
                                    Login
                                </NavLink>
                            </p>
                </div>
                    
            </motion.div>
            <Toaster/>
            </div>
            

           


    
    )
}

export default Signup;


