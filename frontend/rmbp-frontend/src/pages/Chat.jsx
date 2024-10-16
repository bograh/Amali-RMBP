import Header from '../components/Header';
import Query from '../components/Query';

const ChatPage = () => {
  return (
    <div id="chat-page" className="flex flex-col h-screen overflow-y-auto bg-gradient-to-bl from-[#004A4F] to-[#13cdbb] text-[#fff]">
      <Header />
      <main id="chat-main" className="flex-grow flex flex-col p-4">
        <Query />
      </main>
    </div>
  );
};

export default ChatPage;