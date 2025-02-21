import { useState } from 'react';

const TaskForm = ({ onSave, existingTask }) => {
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(
    existingTask?.description || ''
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, dueDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded">
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
