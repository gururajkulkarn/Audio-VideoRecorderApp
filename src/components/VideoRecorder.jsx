import React, { useRef, useState } from 'react';

const VideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const videoRef = useRef(null);
  const videoRecorder = useRef(null);
  const vrecordedData = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    videoRecorder.current = new MediaRecorder(stream);
    vrecordedData.current = [];

    videoRecorder.current.ondataavailable = e => vrecordedData.current.push(e.data);
    videoRecorder.current.onstop = () => {
      const blob = new Blob(vrecordedData.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    };

    videoRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    videoRecorder.current.stop();
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setRecording(false);
  };

  return (
    <div>
      <h2>Video Recorder</h2>
      <video ref={videoRef} autoPlay muted width="400" height="300" />
      {recording ? (
        <button onClick={stopRecording} className="btn btn-danger"> Stop</button>
      ) : (
        <button onClick={startRecording} className="btn btn-primary" > Record</button>
      )}
        <br/>
      {videoURL && (
        <>
          <video controls src={videoURL} width="400" />
          <a href={videoURL} download="video.webm">
            <button className="btn btn-primary"> Download</button>
          </a>
        </>
      )}
    </div>
  );
};

export default VideoRecorder;
    