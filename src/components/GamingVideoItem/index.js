import React from 'react'
import {
  VideoCardContainer,
  ThumbnailImage,
  VideoCardBottomContainer,
  VideoDetailsContainer,
  VideoDetailsText,
  NavLink,
} from './styledComponents'

type VideoCardProps = {
  details: {
    title: string;
    id: string;
    thumbnailUrl: string;
    viewCount: number;
  };
};

const VideoCardTwo: React.FC<VideoCardProps> = ({ details }) => {
  const { title, id, thumbnailUrl, viewCount } = details;

  if (!details) {
    return null; // or return a fallback UI if details are not available
  }

  return (
    <NavLink to={`videos/${id}`}>
      <VideoCardContainer>
        <ThumbnailImage src={thumbnailUrl} alt="video thumbnail" />
        <VideoCardBottomContainer>
          <VideoDetailsContainer>
            <VideoDetailsText>{title}</VideoDetailsText>
            <VideoDetailsText>{viewCount} views</VideoDetailsText>
          </VideoDetailsContainer>
        </VideoCardBottomContainer>
      </VideoCardContainer>
    </NavLink>
  );
}

export default VideoCardTwo;
