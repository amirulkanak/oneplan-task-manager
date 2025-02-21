import ActivityLog from '@/components/ActivityLog';
import TaskBoard from '@/components/TaskBoard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Oneplan Task Manager
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="col-span-2">
          <TaskBoard />
        </div>
        <div className="col-span-1">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
