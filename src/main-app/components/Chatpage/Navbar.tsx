import { signOut } from 'firebase/auth';
import { useAuth } from 'main-app/context/auth';
import { auth } from 'main-app/firebase/firebase';
import { defaultAvatar } from 'main-app/utils/constants';

const Navbar = () => {
  const currentUser = useAuth();
  const handleLogout = () => {
    signOut(auth);
    location.reload();
  };
  return (
    <div className="px-2 py-4 bg-theme-bg-secondary-bold text-white flex items-center justify-between">
      <span className="text-xl font-semibold">Firechat</span>
      <div className="flex gap-2">
        <img
          className="w-6 h-6 rounded-full object-cover border-[1px] border-white"
          src={
            currentUser?.photoURL
              ? currentUser?.photoURL
              : defaultAvatar
          }
          onError={(e) => {
            e.target.src = defaultAvatar
          }}
          alt="Avatar"
        />
        <span>{currentUser?.displayName}</span>
        <button
          onClick={handleLogout}
          className="bg-[#ffffff33] px-1 py-.5 text-sm"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
