import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask, deleteTask } from '@/api/taskService';

const TaskCard = ({ task }) => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  const handleSave = () => {
    updateTaskMutation.mutate({
      taskId: task._id,
      updatedData: { title: editedTitle, description: editedDescription },
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(task._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-1 rounded mr-2">
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-1 rounded">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {task.description}
            </p>
          )}
          <div className="flex justify-between mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-2 py-1 rounded">
              X
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
