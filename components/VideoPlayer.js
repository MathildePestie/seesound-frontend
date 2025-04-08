const VideoPlayer = ({ videoUrl }) => {
    return videoUrl ? <video controls src={videoUrl} width="800" /> : null;
  };
  
  export default VideoPlayer;  