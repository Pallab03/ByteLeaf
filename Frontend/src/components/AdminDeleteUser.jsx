import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'
import { CircleUserRound, Sun , Moon } from 'lucide-react';

const AdminDeleteUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  

    useEffect(() => {
        fetchUsers();
    }, []);


    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axiosClient.get('/user/getAllUser');
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch problems');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this User?')) return;

        try {
            await axiosClient.delete(`user/admin/deleteUser/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            setError('Failed to delete user');
            console.error(err);
        }
        window.alert("user is Deleted");
    };
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
        <div className="min-h-screen bg-base-200 text-gray-800 transition-colors duration-500" data-theme="green">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center w-full flex-col items-center justify-evenly flex mb-12  shadow-md  text-lime-500">
             <h1 className="text-6xl font-bold text-lime-500 mb-4">
                Remove Users
              </h1>
              <p className="text-gray-300 text-lg">
                Delete Users on your Platform
              </p>
             </div>
                
            

            {/* Admin Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {users.map((user) => {
                return (
                  <div
                    key={user._id}
                    className="card bg-white text-gray-800 shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="card-body">
                      <div className="flex items-center space-x-4 mb-4">
                        <CircleUserRound className="w-10 h-10 text-gray-400" />
                        <h2 className="card-title text-gray-500 font-bold text-2xl ">{user.firstName} {user.lastName?user.lastName:""}</h2>
                      </div>
                      <p><span className="font-semibold">Role:</span> {user.role}</p>
                      <p><span className="font-semibold">Email:</span> {user.emailId}</p>
                      <p><span className="font-semibold">Submissions:</span> {user.problemSolved.length}</p>
                      <div className="card-actions mt-3 justify-center">
                        <button className="btn btn-error btn-sm" onClick={() => handleDelete(user._id)}>Delete Profile</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

    );
  
    
}
export default AdminDeleteUser;