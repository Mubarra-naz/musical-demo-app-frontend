import Wavesurfer from "wavesurfer.js";
import { useRef, useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { IconButton, TableCell } from "@mui/material";
// import { fetchAudio } from "../../../store/actions/trackActions";

const secTommss = (seconds) => {
  return new Date(seconds * 1000).toUTCString().split(" ")[4].substring(3);
};

const AudioWave = ({ url, id }) => {
  const containerRef = useRef(null);
  const [wavesurfer, setWavesurfer] = useState(null);
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    if (url) {
      const ws = Wavesurfer.create({
        waveColor: "#eeeeee",
        progressColor: "#42a5f5",
        height: "90%",
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        barMinHeight: 1,
        cursorColor: "#ffffff",
        height: 80,
        responsive: true,
        container: containerRef.current,
        userInteraction: true,
        audioContext: new AudioContext(),
        audioSource: "MediaElement",
      });
      ws.load(url);
      // dispatch(fetchAudio(url))
      //   .unwrap()
      //   .then((response) => response.arrayBuffer())
      //   .then((arrayBuffer) => wavesurfer.decodeAudioData(arrayBuffer))
      //   .then((buffer) => wavesurfer.loadDecodedBuffer(buffer))
      //   .catch((error) => console.log("Error:", error));
      ws.on("audioprocess", () => {
        setDuration(secTommss(ws.getDuration()));
      });
      ws.on("ready", () => {
        setDuration(secTommss(ws.getDuration()));
      });
      setWavesurfer(ws);
      return () => {
        ws.destroy();
      };
    }
  }, [url]);

  const clickHandler = (e) => {
    const { scrollTop } = e.target;
    const duration = wavesurfer.getDuration();
    const position = (scrollTop / e.target.clientHeight) * duration;
    wavesurfer.seekTo(position);
    wavesurfer.play();
  };

  const playAudio = () => {
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
  };

  return (
    <>
      <TableCell>
        <IconButton onClick={playAudio}>
          <PlayCircleIcon color="primary" />
        </IconButton>
      </TableCell>
      <TableCell>
        <div ref={containerRef} onClick={clickHandler}></div>
      </TableCell>
      <TableCell>{duration}</TableCell>
    </>
  );
};
export default AudioWave;
