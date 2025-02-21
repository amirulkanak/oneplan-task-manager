import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from '@/api/activityService';
import useAuth from '@/hooks/useAuth';
import dayjs from 'dayjs';
import LoadingSpinner from './LoadingSpinner';

const ActivityLog = () => {
  const { user } = useAuth();
  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities', user.uid],
    queryFn: () => fetchActivities(user.uid),
  });

  if (isLoading)
    return (
      <div className="p-4 mt-4 w-full flex justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        Activity Log
      </h2>
      {activities.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No recent activity.</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li
              key={activity._id}
              className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="font-semibold">{activity.action}</span> -{' '}
              {dayjs(activity.timestamp).format('MMM D, YYYY h:mm A')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;
