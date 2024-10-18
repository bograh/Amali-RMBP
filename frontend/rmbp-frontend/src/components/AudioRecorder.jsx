import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactMic } from 'react-mic';
import { Mic, Pause, Play, Square, X, Send } from 'lucide-react';

const AudioRecorder = ({ onClose, onAudioSent }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const audioRef = useRef(null);
  const token = localStorage.getItem('token');

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const onStop = (recordedBlob) => {
    setAudioUrl(recordedBlob.blobURL);
    setRecordedBlob(recordedBlob.blob);
    localStorage.setItem('recordedAudio', recordedBlob.blobURL);
  };

  const playRecordedAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseRecordedAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
  }, [audioUrl]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const sendAudioToServer = async () => {
    if (!recordedBlob) return;

    const formData = new FormData();
    formData.append('audio_message', recordedBlob, 'recorded_audio.mp3');

    try {
      const response = await fetch('http://16.171.19.134:5000/api/v1/chat/voice', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      const msgId = data.msg_id;

      // Send GET request to /chat/voice with msg_id
      const voiceResponse = await fetch(`http://16.171.19.134:5000/api/v1/chat/voice?msg_id=${msgId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const voiceData = await voiceResponse.json();
      const filePath = voiceData.file_path;

      // Call the onAudioSent callback with the audio URL
      onAudioSent(audioUrl, `http://16.171.19.134:5000/${filePath}`);

      // Close the AudioRecorder component
      onClose();
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-olive bg-opacity-50 flex items-center justify-center">
      <div className="bg-olive rounded-lg p-8 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 mr-2 mt-2 text-[#333434] hover:text-[#3c4a49]"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-[#333434] text-lg font-semibold mb-4">Press to start talking</h2>
        <div className="flex flex-col items-center mt-[60px] space-y-4">
          <ReactMic
            record={isRecording && !isPaused}
            className="w-full h-16 rounded-md"
            onStop={onStop}
            strokeColor="red"
            backgroundColor="#f1f1f1"
            mimeType="audio/mp3"
          />
          <div className="flex space-x-4">
            {isRecording ? (
              <>
                <button
                  onClick={togglePause}
                  className="bg-sage text-[#000] rounded-full p-2 transition-transform duration-300 ease-in-out transform hover:scale-110"
                >
                  {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                </button>
                <button
                  onClick={stopRecording}
                  className="bg-[#df3939] text-white rounded-full p-2 transition-transform duration-300 ease-in-out transform hover:scale-110"
                >
                  <Square className="w-6 h-6" />
                </button>
              </>
            ) : (
              <button
                onClick={startRecording}
                className="bg-red text-[#fff] rounded-full p-4 transition-transform duration-300 ease-in-out transform hover:scale-110"
              >
                <Mic className="w-8 h-8" />
              </button>
            )}
            {audioUrl && (
              <button
                onClick={sendAudioToServer}
                className="bg-blue-500 text-white rounded-full p-2 transition-transform duration-300 ease-in-out transform hover:scale-110"
              >
                <Send className="w-6 h-6" />
              </button>
            )}
          </div>
          {audioUrl && (
            <div className="w-full space-y-2">
              <audio ref={audioRef} src={audioUrl} />
              <div className="flex items-center space-x-2">
                <button
                  onClick={audioRef.current && audioRef.current.paused ? playRecordedAudio : pauseRecordedAudio}
                  className="bg-[#6e9078] text-white rounded-full p-2 transition-transform duration-300 ease-in-out transform hover:scale-110"
                >
                  {audioRef.current && audioRef.current.paused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={(e) => {
                    const time = parseFloat(e.target.value);
                    setCurrentTime(time);
                    audioRef.current.currentTime = time;
                  }}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">{formatTime(currentTime)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AudioRecorder.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAudioSent: PropTypes.func.isRequired,
};

export default AudioRecorder;