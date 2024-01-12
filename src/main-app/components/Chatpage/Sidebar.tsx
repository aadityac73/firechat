import Navbar from './Navbar';
import Chats from './Chats';
import Search from './Search';

const Sidebar = () => {
  return (
    <div className="w-[30%] h-full bg-theme-bg-secondary">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
