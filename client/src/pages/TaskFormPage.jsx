import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskFormPage() {

  const { register, handleSubmit, setValue } = useForm();
  const { tasks, createTask, getTask, updateTask } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTask() {
      if (id) {
        const task = await getTask(id);
        setValue('title', task.title);
        setValue('description', task.description);
        setValue('date', dayjs.utc(task.date).format('YYYY-MM-DD'))
      }

    }

    loadTask();
  }, [])

  const onSubmit = handleSubmit((data) => {

    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }

    if (!id) {
      createTask(dataValid);
    } else {
      updateTask(id,
        {
          ...data,
          date: dayjs.utc(data.date).format()
        });
    }

    navigate('/tasks');

  })
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>

        <input type="text" placeholder="Title"
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          {...register('title',
            {
              required: true
            })}
          autoFocus
        />
        <label htmlFor="description">Description</label>
        <textarea rows="3" placeholder="Description"
          {...register('description', {
            required: true
          })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        ></textarea>

        <label htmlFor="date">Date</label>

        <input type="date"
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          {...register('date')}
        />

        <button
          className='bg-indigo-500 py-2 rounded-md px-3'
        >Save</button>

      </form>
    </div>
    </div>
  )
}
export default TaskFormPage
