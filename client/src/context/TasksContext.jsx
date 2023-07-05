import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/task";

const taskContext = createContext();

export const useTasks = () => {
  const context = useContext(taskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await getTasksRequest()
    try {
      setTasks(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res)
  }


  return (
    <taskContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </taskContext.Provider>
  );
}