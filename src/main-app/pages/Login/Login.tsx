import { signInWithEmailAndPassword } from 'firebase/auth';
import CInput from 'main-app/components/common/CInput/CInput';
import { auth } from 'main-app/firebase/firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [err, setErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(false)
    setLoading(true)
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
      window.location.href = '/'
    } catch (error) {
      setErr(true);
      setLoading(false)
    }
  };
  return (
    <div className="flex w-max h-[100vh]">
      <div className="h-full w-[400px] bg-theme-purple" />
      <div className="w-[calc(100vw-400px)] flex justify-center items-center">
        <div className="w-[300px]">
          <h1 className="text-center text-3xl">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <CInput containerClasses="mt-9" type="text" label="Email" autoFocus />
            <CInput containerClasses="mt-3" type="password" label="Password" />
            {err && <span className="text-sm">Something went wrong!</span>}
            <button className="bg-theme-purple block w-full text-white py-1.5 rounded-md mt-4">
              {loading ? (
                <span key={'loading'}
                  className={cn(
                    'block w-6 h-6 animate-spin rounded-full mx-auto',
                    'border-[4px] border-t-white border-b-white',
                    'border-r-[#ffffff55] border-l-[#ffffff55]'
                  )}
                />
              ) : (
                <span key={'text'} className="block h-6">Sign in</span>
              )}
            </button>
            <span className="block text-center mt-1 text-sm mt-2">
              Don't have an account?{' '}
              <Link
                className="text-blue-700 hover:border-b border-blue-700"
                to="/register"
              >
                Signup here
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
