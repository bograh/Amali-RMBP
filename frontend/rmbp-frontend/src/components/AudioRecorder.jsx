import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactMic } from 'react-mic';
import { Mic, Pause, Play, Square, X } from 'lucide-react';

const AudioRecorder = ({ onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

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
};

export default AudioRecorder;
