import { useState, useEffect, useRef } from 'react';
import { Send, Mic, Loader, Play, Pause } from 'lucide-react';
import AudioRecorder from './AudioRecorder';

const BASE_URL = "http://16.171.19.134:5000/api/v1";

const Query = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null);
  const [audioBlobs, setAudioBlobs] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const inputContainerRef = useRef(null);
  const audioRef = useRef(null);
  const token = localStorage.getItem("token");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
    
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
          'Authorization': `Bearer ${token}`,
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

  const fetchAudioFile = async (audioUrl) => {
    if (audioBlobs[audioUrl]) {
      return audioBlobs[audioUrl];
    }

    try {
      const response = await fetch(audioUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const blob = await response.blob();
      setAudioBlobs(prev => ({ ...prev, [audioUrl]: URL.createObjectURL(blob) }));
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error fetching audio file:", error);
      return null;
    }
  };

  const toggleAudio = async (audioUrl) => {
    if (currentPlayingAudio === audioUrl) {
      audioRef.current.pause();
      setCurrentPlayingAudio(null);
    } else {
      const blobUrl = await fetchAudioFile(audioUrl);
      if (blobUrl) {
        if (audioRef.current) {
          audioRef.current.src = blobUrl;
          audioRef.current.play();
          setCurrentPlayingAudio(audioUrl);
        }
      }
    }
  };

  const handleAudioSent = (userAudioUrl, responseAudioUrl) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'sender', content: 'Audio message', audioUrl: userAudioUrl },
      { type: 'receiver', content: 'Audio response', audioUrl: responseAudioUrl }
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-2 ${message.type === 'sender' ? 'flex justify-end' : 'flex justify-start'}`}
            >
              <div 
                className={`inline-block rounded-2xl p-3 break-words ${
                  message.type === 'sender' 
                    ? 'bg-[#2b9997] text-[#fff]' 
                    : 'bg-sage text-[#fff]'
                }`}
                style={{
                  maxWidth: '70%',
                  width: 'fit-content'
                }}
              >
                {message.content}
                {message.audioUrl && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleAudio(message.audioUrl)}
                      className="bg-[#6e9078] text-white rounded-full p-2 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      {currentPlayingAudio === message.audioUrl ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-sage text-[#fff] rounded-lg p-3">
                <Loader className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="w-full p-4 flex justify-center">
        <div
          ref={inputContainerRef}
          className="w-full max-w-4xl relative flex items-center bg-gradient-to-b from-transparent to-[#97FFB3] rounded-full p-2 text-[#000] transition-all duration-300"
        >
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-grow p-2 sm:p-3 shadow-md shadow-olive border-olive bg-white rounded overflow-y-auto text-black placeholder-gray-500 outline-none text-sm sm:text-base resize-none overflow-hidden min-h-[20px] max-h-[200px] hover:shadow-md hover:shadow-sage"
            style={{ paddingRight: "40px" }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-2 sm:p-2 ml-3 sm:mr-[6px] bg-[#004A4F] text-white rounded-full flex items-center hover:bg-sage justify-center ${
              !inputText.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Send className="w-6 h-6 sm:w-7 sm:h-7 mr-1 text-[#fff] hover:text-olive" />
          </button>
          <button
            onClick={toggleRecording}
            className="p-2 sm:p-2 ml-3 bg-transparent rounded-full border bg-olive text-[#fff] hover:bg-sage"
          >
            <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-[#fff] hover:text-olive" />
          </button>
        </div>
      </div>

      {isRecording && <AudioRecorder onClose={toggleRecording} onAudioSent={handleAudioSent} />}
      <audio ref={audioRef} onEnded={() => setCurrentPlayingAudio(null)} />
    </div>
  );
};

export default Query;