import {useForm} from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function TaskFormPage() {

  const {register, handleSubmit, setValue} = useForm();
  const {tasks, createTask, getTask, updateTask} = useTasks();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() =>{
    async function loadTask(){
      if(id){
        const task = await getTask(id);
        setValue('title', task.title);
      setValue('description', task.description);
      }
      
    }

    loadTask();
  },[])

  const onSubmit = handleSubmit((data) =>{
    if(!id){
      createTask(data);
    }else{
      updateTask(id, data);
    }
    
    navigate('/tasks');
   
  })
   return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>

        <input type="text" placeholder="Title"
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        {...register('title',
        {
          required: true
        })}
        autoFocus
        />
        <textarea rows="3" placeholder="Description"
        {...register('description',{
          required: true
        })}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        ></textarea>
        <button>Guardar</button>

      </form>
    </div>
  )
}
export default TaskFormPage
