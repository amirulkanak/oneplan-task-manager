import TaskBoard from '@/components/TaskBoard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Oneplan Task Manager
      </h1>
      <TaskBoard />
    </div>
  );
};

export default Dashboard;
