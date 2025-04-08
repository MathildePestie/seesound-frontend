import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import musicLoader from "../public/music-loader.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const VisualizerLinear = () => {
  const reduxToken = useSelector((state) => state.user.token);
  const token = reduxToken || localStorage.getItem("token");

  const canvasRef = useRef(null);
  const audioRef = useRef(new Audio());
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const isRecordingRef = useRef(false);

  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const ctxRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationIdRef = useRef(null);
  const sourceRef = useRef(null);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const handleAudioFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setAudioFile(file);
  };

  useEffect(() => {
    if (!audioFile) return;
    generateVisualAndUpload();
  }, [audioFile]);

  const generateVisualAndUpload = async () => {
    setLoading(true);
    setProgress(0);

    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
    canvas.width = 1280;
    canvas.height = 720;

    const objectURL = URL.createObjectURL(audioFile);
    audioRef.current.src = objectURL;
    audioRef.current.load();

    audioRef.current.onloadedmetadata = async () => {
      const duration = audioRef.current.duration;

      let startTime = Date.now();
      const updateProgress = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const percent = Math.min((elapsed / duration) * 100, 100);
        setProgress(percent);
        if (percent < 100) requestAnimationFrame(updateProgress);
      };

      updateProgress();
      await startDrawing();
      startRecording();
      audioRef.current.play();

      setTimeout(() => {
        stopRecording();
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }, duration * 1000);
    };
  };

  const startDrawing = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    if (!analyserRef.current) {
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 512;
      dataArrayRef.current = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );
    }

    if (!sourceRef.current) {
      sourceRef.current = audioContext.createMediaElementSource(
        audioRef.current
      );
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContext.destination);
    }

    const draw = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      ctx.beginPath();
      const centerY = canvasRef.current.height / 2;
      const sliceWidth = canvasRef.current.width / dataArrayRef.current.length;
      let x = 0;

      ctx.moveTo(0, centerY);
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const v = dataArrayRef.current[i] / 255;
        const y =
          centerY + v * canvasRef.current.height * 0.4 * Math.sin(i * 0.1);
        ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvasRef.current.width, centerY);
      const bassAvg =
        dataArrayRef.current
          .slice(0, dataArrayRef.current.length / 3)
          .reduce((a, b) => a + b, 0) /
        (dataArrayRef.current.length / 3);

      const hue = Math.floor((bassAvg / 255) * 360);
      ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`;
      ctx.lineWidth = 3;
      ctx.stroke();

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return Promise.resolve();
  };

  const startRecording = () => {
    recordedChunksRef.current = [];
    const canvasStream = canvasRef.current.captureStream(30);
    const audioContext = audioContextRef.current;
    const dest = audioContext.createMediaStreamDestination();
    analyserRef.current.connect(dest);
    const audioStream = dest.stream;

    const combinedStream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioStream.getAudioTracks(),
    ]);

    mediaRecorderRef.current = new MediaRecorder(combinedStream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      setVideoFile(blob);
      sendToBackend(blob);
    };

    mediaRecorderRef.current.start();
    isRecordingRef.current = true;
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecordingRef.current) {
      mediaRecorderRef.current.stop();
      isRecordingRef.current = false;
      cancelAnimationFrame(animationIdRef.current);
    }
  };

  const sendToBackend = async (videoBlob) => {
    const formData = new FormData();
    formData.append("video", videoBlob);
    formData.append("audio", audioFile);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("date_of_creation", date);

    console.log("🎯 Token envoyé dans fetch :", token);


    try {
      const response = await fetch("https://seesound-backend.onrender.com/upload/save-visual", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("✅ MP4 sauvegardé :", data);
    } catch (error) {
      console.error("❌ Erreur d'envoi :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStyledUploadClick = () => {
    document.getElementById("realFileInput").click();
  };

  const [isHovered, setIsHovered] = useState(false);
  const isDarkMode =
    typeof window !== "undefined" &&
    document.body.classList.contains("dark-mode");

  const buttonStyle = {
    backgroundColor: isHovered
      ? isDarkMode
        ? "black"
        : "white"
      : isDarkMode
      ? "white"
      : "black",
    color: isHovered
      ? isDarkMode
        ? "white"
        : "black"
      : isDarkMode
      ? "black"
      : "white",
    border: `1px solid ${
      isHovered
        ? isDarkMode
          ? "white"
          : "black"
        : isDarkMode
        ? "black"
        : "white"
    }`,
    transition: "all 0.3s ease-in-out",
    padding: "10px 30px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "550",
    fontFamily: "helvetica",
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {!videoFile && !loading && (
        <>
          <div style={{ marginBottom: "2rem" }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ margin: "0.5rem", padding: "0.5rem" }}
            />
            <input
              type="text"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              style={{ margin: "0.5rem", padding: "0.5rem" }}
            />
            <input
              type="text"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ margin: "0.5rem", padding: "0.5rem" }}
            />
          </div>
          <input
            id="realFileInput"
            type="file"
            accept="audio/*"
            onChange={handleAudioFileChange}
            style={{ display: "none" }}
          />
          <button
            onClick={handleStyledUploadClick}
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Upload your audio
          </button>
        </>
      )}

      {loading && (
        <div
          style={{
            width: "400px",
            height: "350px",
            backgroundColor: "white",
            padding: "1rem",
            margin: "0 auto",
          }}
        >
          <Lottie
            animationData={musicLoader}
            loop={true}
            style={{ width: 200, margin: "0 auto" }}
          />
          <div
            style={{
              width: "200px",
              height: "8px",
              backgroundColor: "#eee",
              borderRadius: "4px",
              margin: "1rem auto",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "8px",
                background:
                  "linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet)",
                backgroundSize: "400% 100%",
                animation: "shift 3s infinite linear",
                borderRadius: "4px",
                margin: "1rem auto",
              }}
            />
          </div>
          <p style={{ color: "black", fontSize: "1.2rem", fontWeight: "bold", whiteSpace: "nowrap" }}>
            Please wait while the visualization loads...
          </p>
        </div>
      )}

      {videoFile && (
        <div style={{ marginTop: "2rem" }}>
          <video controls width="800" src={URL.createObjectURL(videoFile)} />
        </div>
      )}
    </div>
  );
};

export default VisualizerLinear;
