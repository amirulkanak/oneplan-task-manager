import { useDroppable } from '@dnd-kit/core';
import TaskSortableItem from './TaskSortableItem';

function TaskColumn({ category, tasks, onEdit, onDelete }) {
  // Pass container data so droppable works even when empty.
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: category,
    data: { sortable: { containerId: category } },
  });

  return (
    <div
      ref={setDroppableNodeRef}
      className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg w-full"
      data-sortable-container-id={category} // Mark container for DnD when empty
    >
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      {tasks.map((task) => (
        <TaskSortableItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskColumn;
