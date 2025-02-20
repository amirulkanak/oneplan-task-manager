import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask, fetchTasks, updateTask } from '@/api/taskService';
import TaskCard from './TaskCard';
import LoadingSpinner from './LoadingSpinner';

const TaskBoard = () => {
  const queryClient = useQueryClient();

  // Fetch tasks from the backend
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  // Mutation for updating task order
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  // Function to handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const movedTask = tasks.find((task) => task._id === result.draggableId);
    if (!movedTask) return;

    const updatedTask = { ...movedTask, category: destination.droppableId };

    updateTaskMutation.mutate({
      taskId: movedTask._id,
      updatedData: updatedTask,
    });
  };

  // Add task button functionality
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  const handleAddTask = () => {
    const newTask = {
      title: 'New Task',
      description: '',
      category: 'To-Do',
    };
    addTaskMutation.mutate(newTask);
  };
  // Show loading spinner while fetching tasks
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 p-4">
          {['To-Do', 'In Progress', 'Done'].map((category) => (
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
                    {tasks
                      .filter((task) => task.category === category)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
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
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </>
  );
};

export default TaskBoard;
