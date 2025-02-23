import { useSortable } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

function TaskSortableItem({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: task._id });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className="task">
      <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

export default TaskSortableItem;
