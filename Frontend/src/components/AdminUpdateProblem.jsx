import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { Navigate, useNavigate } from "react-router";


const AdminUpdateProblem = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this problem?')) return;
    
//     try {
//       await axiosClient.delete(`/problem/delete/${id}`);
//       setProblems(problems.filter(problem => problem._id !== id));
//     } catch (err) {
//       setError('Failed to delete problem');
//       console.error(err);
//     }
//   };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen min-w-full p-4" data-theme="lemonade">
      <div className="flex w-full justify-center items-center mb-6">
        <h1 className="text-3xl text-center text-gray-500 font-bold">Update Problems</h1>
      </div>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="table table-zebra w-full">
          <thead className=" border-b-2 border-gray-400">
            <tr >
              <th className="w-1/12 ">No</th>
              <th className="w-4/12 ">Title</th>
              <th className="w-2/12 text-center">Difficulty</th>
              <th className="w-3/12 text-center">Tags</th>
              <th className="w-2/12 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem._id}>
                <th className="text-xl">{index + 1}</th>
                <td className="text-xl font-bold">{problem.title}</td>
                <td className="text-center">
                  <span className={`badge text-lg rounded ${
                    problem.difficulty === 'easy' 
                      ? 'badge-success' 
                      : problem.difficulty === 'medium' 
                        ? 'badge-warning' 
                        : 'badge-error'
                  }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="text-center">
                  <span className="badge rounded badge-outline">
                    {problem.tags}
                  </span>
                </td>
                <td >
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() =>navigate(`/admin/adminUpdateProblem/${problem._id}`)}
                      className="btn btn-md btn-info shadow-xl"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUpdateProblem
