import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeLiveStreamingDemo = () => {
  const [liveStreams, setLiveStreams] = useState([]);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      try {
        const apiKey = ""; // Replace 'YOUR_API_KEY' with your actual YouTube API key
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&eventType=live`
        );

        const liveStreamsData = response.data.items;
        setLiveStreams(liveStreamsData);
      } catch (error) {
        console.error('Error fetching live streams:', error);
      }
    };

    fetchLiveStreams();

  }, []);

  return (
    <div>
      <h1>Live Streams</h1>
      {liveStreams.map((stream) => (
        <div key={stream.id.videoId}>
          <h2>{stream.snippet.title}</h2>
          <p>{stream.snippet.description}</p>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${stream.id.videoId}`}
            title={stream.snippet.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default YouTubeLiveStreamingDemo;
