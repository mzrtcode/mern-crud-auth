import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext"

const TaskCard = ({ task }) => {

    const { deleteTask } = useTasks();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className="bg-red-500 p-2 rounded-md"
                        onClick={() => {deleteTask(task._id) }}
                        >
                            Delete
                    </button>
                    <Link to={`/tasks/${task._id}`} className="bg-indigo-500 p-2 rounded-md">Edit</Link>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p>{new Date(task.date).toLocaleDateString()}</p>
        </div>
    )
}
export default TaskCard