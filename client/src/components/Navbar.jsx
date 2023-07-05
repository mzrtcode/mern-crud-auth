import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();
    return (
        <>
            <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
                <Link 
                to={isAuthenticated ? '/tasks' : '/'}
                >
                    <h1 className="text-2xl font-bold">Task Manager</h1>
                </Link>
                <ul className="flex gap-x-2">


                    {isAuthenticated ? (
                        <>
                            <li>Welcome {user?.username}</li>
                            <li>
                                <Link to='/add-task'
                                className="bg-indigo-500 px-4 py-2 rounded-md text-white"
                                >Add task</Link>
                            </li>
                            <li>
                                <Link to='/'
                                onClick={()=>{logout()}}
                                className="bg-red-500 px-4 py-2 rounded-md text-white"
                                >Log out</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'
                                className="bg-green-500 px-4 py-2 rounded-md text-white"
                                >Login</Link>
                            </li>
                            <li>
                                <Link to='/register'
                                className="bg-indigo-500 px-4 py-2 rounded-md text-white"
                                >Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <main className="container mx-auto px-10">
            <Outlet />
            </main>
            
        </>
    )
}
export default Navbar