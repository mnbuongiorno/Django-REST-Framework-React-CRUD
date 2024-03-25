import { useForm } from "react-hook-form";
import { createTask, deleteTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";

export function TasksFormPage() {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params)

  const onSubmit = handleSubmit(async data => {
    const res = await createTask(data)
    navigate("/tasks");
    console.log(res)

  })


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>Title required </span>}

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>Description required </span>}
        <button>Save</button>
      </form>

    {
      params.id && (
        <button onClick={async ()=>{
          const accepted = window.confirm('are you sure?')
          if (accepted){
            deleteTask(params.id);
            navigate('/tasks');
          }
        }}>
        Delete 
      </button>
      )
    }
    </div>
  );
}
