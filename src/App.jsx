import React, { useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import VideoRecorder from "./components/VideoRecorder";

function App() {
  const [mode, setMode] = useState("audio");

  return (
    <div className="app" style={{ textAlign: "center" }}>
      <h1> Audio & Video Recorder</h1>
      <div className="d-flex justify-content-center">
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="form-select form-select-sm mb-3 w-25"
        >
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
      </div>
      {mode === "audio" ? <AudioRecorder /> : <VideoRecorder />}
    </div>
  );
}

export default App;
