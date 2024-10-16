import { useState, useEffect, useRef } from 'react';
import { Send, Mic, X, Loader } from 'lucide-react';

const BASE_URL = "http://16.171.19.134:5000/api/v1";

const Query = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const inputContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
    
    // Update input container shape based on content
    if (inputContainerRef.current) {
      const isMultiline = inputRef.current.scrollHeight > 40;
      inputContainerRef.current.style.borderRadius = isMultiline ? '20px' : '9999px';
    }
  }, [inputText]);

  const sendMessageToApi = async (message) => {
    let url = `${BASE_URL}/chat`;
    let body = { message };

    if (message.startsWith('/translate: ')) {
      url = `${BASE_URL}/translate`;
      body = { text: message.replace('/translate: ', '') };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return message.startsWith('/translate: ') ? data.translated_text : data.response;
    } catch (error) {
      console.error("Error:", error);
      return "Error in fetching response. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = { type: 'sender', content: inputText };
      setMessages([...messages, newMessage]);
      setInputText('');
      setIsLoading(true);

      const responseMessage = await sendMessageToApi(inputText);
      setMessages(prevMessages => [...prevMessages, { type: 'receiver', content: responseMessage }]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 ${message.type === 'sender' ? 'text-right mr-[180px]' : 'text-left ml-[270px]'}`}
          >
            <div 
              className={`inline-block rounded-lg p-3 w-[40%] break-words ${
                message.type === 'sender' 
                  ? 'bg-[#2b9997] text-[#fff]' 
                  : 'bg-[#1f7271] text-[#fff]'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4 ml-[270px]">
            <div className="bg-[#1f7271] text-[#fff] rounded-lg p-3">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="w-full p-4 flex justify-center">
        <div ref={inputContainerRef} className="w-[80%] md:w-[55%] relative flex items-end bg-gradient-to-b from-transparent to-[#97FFB3] rounded-full p-2 text-[#000] transition-all duration-300">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything ..."
            className="flex-grow p-2 sm:p-3 bg-white rounded overflow-y-auto text-black placeholder-gray-500 outline-none pr-12 text-sm sm:text-base resize-none overflow-hidden min-h-[20px] max-h-[200px]"
            style={{paddingRight: '40px'}}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-1 sm:p-2 sm:mr-[6px] bg-[#004A4F] text-white rounded-full absolute right-2 bottom-2 flex items-center justify-center ${!inputText.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Send className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-2 ml-1 sm:ml-2 text-[#fff]" />
          </button>
        </div>
        <button
          onClick={toggleRecording}
          className="p-1 sm:p-2 ml-2 bg-transparent text-[#fff]"
        >
          <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {isRecording && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#fff] rounded-lg p-6 flex flex-col items-center">
            <button
              onClick={toggleRecording}
              className="self-end text-[#000]"
            >
              <X className="w-6 h-6" />
            </button>
            <p className="text-[#000] mb-4">Click mic to start recording</p>
            <button
              onClick={toggleRecording}
              className="bg-[#004A4F] text-[#fff] rounded-full p-4"
            >
              <Mic className="w-12 h-12" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Query;
