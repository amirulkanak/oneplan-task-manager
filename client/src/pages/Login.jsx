import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginWithGooglePopup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await loginWithGooglePopup();
      console.log('User:', result.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
        <p className="mb-6 text-gray-600">
          Login to continue to your dashboard
        </p>
        <button
          onClick={handleLogin}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
