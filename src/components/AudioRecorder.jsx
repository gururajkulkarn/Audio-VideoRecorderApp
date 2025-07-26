import React, { useRef, useState } from "react";

const AudioRecorderf = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const micRecorder = useRef(null);
  const recordedData = useRef([]);
 

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micRecorder.current = new MediaRecorder(stream);
    recordedData.current = [];

    micRecorder.current.ondataavailable = (e) => {
      recordedData.current.push(e.data);
    };

    micRecorder.current.onstop = () => {
      const blob = new Blob(recordedData.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

    };

    micRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    micRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div>
      <h2>Audio Recorder</h2>


      {recording ? (
        <button onClick={stopRecording} className="btn btn-danger" >Stop</button>
      ) : (
        <button onClick={startRecording}  className="btn btn-primary" >Record</button>
      )}
      <br/>

      {audioURL && (
        <>
          <audio controls src={audioURL}></audio>
          <a href={audioURL} download="audio.webm">
            <button className="btn btn-primary">Download</button>
          </a>
        </>
      )}
    </div>
  );
};

export default AudioRecorderf;
