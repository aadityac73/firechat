import Chat from 'main-app/components/Chatpage/Chat';
import Sidebar from 'main-app/components/Chatpage/Sidebar';

const Homepage = () => {
  return (
    <div className="bg-[#172332] h-[100vh] flex justify-center items-center">
      <div className='w-[80%] h-[90%] shadow-xl rounded-md flex overflow-hidden'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Homepage;
