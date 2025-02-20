const TaskCard = ({ task }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {task.description}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
