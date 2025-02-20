import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '@/api/taskService';

const TaskCard = ({ task }) => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(task._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {task.description}
          </p>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
        X
      </button>
    </div>
  );
};

export default TaskCard;
