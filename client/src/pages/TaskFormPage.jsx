import {useForm} from 'react-hook-form';
import { useTasks } from '../context/TasksContext';

function TaskFormPage() {

  const {register, handleSubmit} = useForm();
  const {tasks, createTask} = useTasks();

  const onSubmit = handleSubmit((data) =>{
    createTask(data);
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
