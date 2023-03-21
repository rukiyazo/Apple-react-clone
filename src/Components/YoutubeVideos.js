import React, { useEffect, useState } from "react";
import "./youtube.css";
function YoutubeVideos() {
  const [Videos, setvideos] = useState([]);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}&channelId=${process.env.REACT_APP_CHANNEL_ID}&part=snippet,id&maxResults=9`
    )
      .then((response) => response.json())
      .then((data) => {
        const VideosData = data.items;
        setvideos(VideosData);
      });
  }, []);
  console.log(Videos);
  return (
    <div className="allVideosWrapper">
      <div className="container">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-12">
            <div className="title-wraper h5 video-title-wrapper">
              Random Videos
            </div>
          </div>
          {Videos.map((singleVideo, i) => {
            let vId = singleVideo.id.videoId;
            let vidLink = `https://www.youtube.com/watch?v=${vId}`;

            let videoWrapper = (
              <div key={i} className="col-sm-12 col-md-4">
                <div className="singleVideoWrapper">
                  <div className="videoThumbnail">
                    <a href={vidLink} target="_blank">
                      <img src={singleVideo.snippet.thumbnails.high.url} />
                    </a>
                  </div>
                  <div className="videoInfoWrapper">
                    <div className="videoTitle">
                      <a href={vidLink} target="_blank">
                        {singleVideo.snippet.title}
                      </a>
                    </div>
                    <div className="videoDesc">
                      {singleVideo.snippet.description}
                    </div>
                    <div className="videopub">
                      {singleVideo.snippet.publishTime}
                    </div>
                  </div>
                </div>
              </div>
            );
            return videoWrapper;
          })}
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideos;
