import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import { Moon, Sun } from 'lucide-react';
import useTheme from '@/hooks/useTheme';
import toast from 'react-hot-toast';

function Dashboard() {
  const [user] = useAuthState(auth);
  const queryClient = useQueryClient();
  const { theme, toggleTheme } = useTheme();
  const [editingTask, setEditingTask] = useState(null);

  // Axios base URL
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  // Fetch tasks
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const token = await user.getIdToken();
      const response = await axios.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  // Handle drag-and-drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    let targetCategory;
    const overTask = tasks.find((task) => task._id === over.id);
    if (overTask) {
      targetCategory = overTask.category;
    } else if (over.data.current && over.data.current.sortable) {
      targetCategory = over.data.current.sortable.containerId;
    } else if (categories.includes(over.id)) {
      // When dropping over an empty column (over.id is the column name)
      targetCategory = over.id;
    } else {
      return;
    }

    if (activeTask.category !== targetCategory) {
      // Moving to a different column: update category and set order as the last in the new category.
      const tasksInTarget = tasks.filter(
        (task) => task.category === targetCategory
      );
      const updatedTask = {
        ...activeTask,
        category: targetCategory,
        order: tasksInTarget.length,
      };
      await updateTaskMutation.mutateAsync(updatedTask);
    } else {
      // Reorder within the same column
      const tasksInCategory = tasks.filter(
        (task) => task.category === activeTask.category
      );
      const oldIndex = tasksInCategory.findIndex(
        (task) => task._id === activeTask._id
      );
      const newIndex = tasksInCategory.findIndex(
        (task) => task._id === over.id
      );
      const newTasksOrder = arrayMove(tasksInCategory, oldIndex, newIndex);
      newTasksOrder.forEach((task, index) => (task.order = index));
      await updateTasksOrderMutation.mutateAsync(newTasksOrder);
    }
  };

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const token = await user.getIdToken();
      await axios.put(`/tasks/${updatedTask._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  const updateTasksOrderMutation = useMutation({
    mutationFn: async (newTasks) => {
      const token = await user.getIdToken();
      await Promise.all(
        newTasks.map((task) =>
          axios.put(
            `/tasks/${task._id}`,
            { order: task.order },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      const token = await user.getIdToken();
      await axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  const handleEditTask = (task) => setEditingTask(task);

  const handleDeleteTask = (taskId) => {
    toast(
      (t) => (
        <div className="p-4">
          <p>Are you sure you want to delete this task?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                deleteTaskMutation.mutate(taskId);
                toast.dismiss(t.id);
              }}
              className="bg-red-600 text-white px-2 py-1 rounded">
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-black px-2 py-1 rounded">
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const categories = ['To-Do', 'In Progress', 'Done'];

  return (
    <div className="mx-auto p-4">
      <nav className="flex justify-between mb-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Oneplan</h1>
          <p>
            Manage your Task
            <br />
            <strong>{user.displayName}&#39;s Dashboard</strong>!
          </p>
        </div>
        <div className="flex items-center gap-1 md:gap-3">
          <button
            onClick={() => {
              toggleTheme();
            }}
            className="p-2 rounded-full hover:bg-sky-600/30">
            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => auth.signOut()}
            className="bg-secondary text-white text-xs md:text-base px-4 py-2 rounded">
            Sign Out
          </button>
        </div>
      </nav>
      <button
        onClick={() => setEditingTask({})}
        className="bg-accent text-white px-4 py-2 rounded mb-4">
        Add Task
      </button>
      {editingTask && (
        <TaskForm task={editingTask} onClose={() => setEditingTask(null)} />
      )}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <SortableContext
              key={category}
              items={tasks
                .filter((task) => task.category === category)
                .map((task) => task._id)}>
              <TaskColumn
                category={category}
                tasks={tasks.filter((task) => task.category === category)}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default Dashboard;
