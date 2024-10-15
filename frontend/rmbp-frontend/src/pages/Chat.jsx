import { Send, Mic } from 'lucide-react';
import Header from '../components/Header';

const ChatPage = () => {
  return (
    <div id="chat-page" className="flex flex-col h-screen bg-gradient-to-b from-teal-700 to-teal-900 text-white">
      <Header />
      <main id="chat-main" className="flex-grow flex flex-col justify-center items-center p-4">
        <p id="chat-prompt" className="text-xl sm:text-2xl text-center">
          Type or record to get started
        </p>
      </main>

      <footer id="chat-footer" className="w-full p-4 flex justify-center">
        <div id="input-container" className="w-[80%] md:w-[55%] relative flex items-center bg-gradient-to-b from-transparent to-[#97FFB3] rounded-full p-2">
          <input
            id="chat-input"
            type="text"
            placeholder="Ask me anything ..."
            className="flex-grow p-2 sm:p-3 bg-white rounded-full text-black placeholder-gray-500 outline-none pr-12 text-sm sm:text-base"
          />
          <button id="send-button" data-action="send" className="p-1 sm:p-2 sm:mr-[6px] bg-[#004A4F] text-white rounded-full absolute right-2 flex items-center justify-center">
            <Send className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-2 ml-1 sm:ml-2" />
          </button>
        </div>
        <button id="mic-button" data-action="record" className="p-1 sm:p-2 ml-2 bg-transparent text-white">
          <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </footer>
    </div>
  );
};

export default ChatPage;