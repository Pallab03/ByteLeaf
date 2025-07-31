import { Routes, Route ,Navigate} from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from "./autnSlice";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import AdminPanel from "./components/AdminPanel";
import ProblemPage from "./pages/ProblemPage";
import Admin from "./pages/Admin";
import AdminDelete from "./components/AdminDelete";
import AdminVideo from "./components/AdminVideo";
import AdminUpload from "./components/AdminUpload";
import AdminDeleteUser from "./components/AdminDeleteUser";
import LandingPage from "./pages/LandingPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPassworPage from "./pages/ForgotPassworPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminUpdateProblem from "./components/AdminUpdateProblem";
import UpdateProblem from "./components/UpdateProblem";

function App(){

  const {isAuthenticated,user,loading}= useSelector((state)=>state.auth);
  const dispatch= useDispatch();

  //check initial Authentication
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  //for loading effect
  //  if (loading) {
  //   return <div className="min-h-screen flex items-center justify-center">
  //     <span className="loading loading-spinner loading-lg"></span>
  //   </div>;
  // }


  return(
  <>
    <Routes>
      <Route path="/home" element={isAuthenticated?<HomePage/>:<Navigate to="/signup"/>}/>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={isAuthenticated?<Navigate to="/home" />:<Login/>}/>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/home" />:<Signup/>}/>
      <Route path="/verify-email" element={isAuthenticated?<Navigate to="/home" />:<EmailVerificationPage/>}/>
      <Route path="/forgot-password" element={isAuthenticated?<Navigate to="/home" />:<ForgotPassworPage/>}/>
      <Route path="/reset-password/:token" element={isAuthenticated?<Navigate to="/home" />:<ResetPasswordPage/>}/>
      <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin/> : <Navigate to="/home" />} />
      <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/home" />} />
      <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/home" />} />
      <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/home" />} />
      <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/home" />} />
      <Route path="/admin/deleteUser" element={isAuthenticated && user?.role === 'admin' ? <AdminDeleteUser /> : <Navigate to="/home" />} />
      <Route path="/admin/adminUpdateProblem" element={isAuthenticated && user?.role === 'admin' ? <AdminUpdateProblem /> : <Navigate to="/home" />} />
      <Route path="/problem/:problemId" element={<ProblemPage/>}/>
      <Route path="/admin/adminUpdateProblem/:problemId" element={isAuthenticated && user?.role === 'admin' ? <UpdateProblem/> : <Navigate to="/home" />} />

      {/* <Route path="/admin" element={
        isAuthenticated && user?.role === "admin"?<AdminPanel/>:
        <Navigate to='/' />
      }/> */}
      
       
      
      
    </Routes>
  </>
  )

}
export default App;
