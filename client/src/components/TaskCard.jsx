import { useDraggable } from '@dnd-kit/core';

function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      style={style}
      className="bg-white dark:bg-gray-800 p-4 mb-2 rounded shadow">
      {/* Drag handle now isolated to this element */}
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="cursor-move">
        <h3 className="font-bold">{task.title}</h3>
      </div>
      <p>{task.description}</p>
      {task.dueDate && (
        <p
          className={`text-sm ${
            new Date(task.dueDate) < new Date()
              ? 'text-red-500'
              : 'text-gray-500'
          }`}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="cursor-pointer text-blue-500 py-1 px-2 border border-blue-500 rounded">
          Edit
        </button>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="cursor-pointer text-red-500 py-1 px-2 border border-red-500 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
