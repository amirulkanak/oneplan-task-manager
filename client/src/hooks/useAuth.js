import { useContext } from 'react';
import { UserAuthContext } from '@/context/UserAuthContext';

const useAuth = () => {
  return useContext(UserAuthContext);
};

export default useAuth;
