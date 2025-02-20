import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import TaskCard from './TaskCard';

const initialTasks = {
  'To-Do': [{ id: '1', title: 'Task 1', description: 'Description 1' }],
  'In Progress': [{ id: '2', title: 'Task 2', description: 'Description 2' }],
  Done: [{ id: '3', title: 'Task 3', description: 'Description 3' }],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];

    const newSourceTasks = [...sourceColumn];
    const [movedTask] = newSourceTasks.splice(source.index, 1);

    const newDestTasks = [...destColumn];
    newDestTasks.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: newSourceTasks,
      [destination.droppableId]: newDestTasks,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {Object.keys(tasks).map((category) => (
          <div
            key={category}
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {category}
            </h2>
            <Droppable droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mt-4">
                  {tasks[category].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2">
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
