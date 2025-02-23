import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="flex-1 flex items-center justify-center p-4 bg-primary/5">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold dark:text-primary mb-4">
              Welcome to OnePlan
            </h1>
            <p className="mb-8 text-gray-600">
              Your ultimate task management solution
            </p>
            <button
              onClick={signInWithGoogle}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition duration-300">
              Sign in with Google
            </button>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-8">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl font-bold mb-4">
              Organize your tasks efficiently
            </h1>
            <p className="text-lg opacity-90 text-gray-300">
              Oneplan helps you manage your tasks with an intuitive
              drag-and-drop interface. Create, organize, and track your progress
              all in one place.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
