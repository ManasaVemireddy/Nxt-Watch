import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { ThreeCircles } from 'react-loader-spinner';

import VideoCardTwo from '../GamingVideoItem';
import Header from '../Header';
import SideBar from '../SideBar';
import CartContext from '../../context/CartContext';

import {
  SearchVideosContainer,
  VideosContainer,
  ProductsLoaderContainer,
  HomeStickyContainer,
  HomeSideContainer,
  HomeContainer,
  NotFoundContainer,
  Image,
  Heading,
  Desc,
  Retry,
  NavLink,
} from './styledComponents';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const GamingRoute = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const { isDarkTheme } = useContext(CartContext);

  useEffect(() => {
    getSuggestionVideos();
  }, []);

  const getSuggestionVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = `https://apis.ccbp.in/videos/gaming`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.videos.map((each) => ({
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }));
      setSearchedVideos(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <ProductsLoaderContainer className="products-loader-container" data-testid="loader">
      <ThreeCircles type="ThreeCircles" color="#0b69ff" height={50} width={50} />
    </ProductsLoaderContainer>
  );

  const renderGamingVideos = () => (
    <SearchVideosContainer data-testid="gaming" bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}>
      <h1>Gaming</h1>
      <VideosContainer bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}>
        {searchedVideos.map((each) => (
          <VideoCardTwo key={each.id} details={each} />
        ))}
      </VideosContainer>
    </SearchVideosContainer>
  );

  const renderFailureView = () => (
    <NotFoundContainer>
      <Image src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure view" className="jobs-failure-img" />
      <Heading>Oops! Something Went Wrong</Heading>
      <Desc className="jobs-failure-description">We are having some trouble to complete your request. Please try again.</Desc>
      <NavLink>
        <Retry className="button" type="button" onClick={getSuggestionVideos}>
          Retry
        </Retry>
      </NavLink>
    </NotFoundContainer>
  );

  const renderAllVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderGamingVideos();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div data-testid="home">
      <Header />
      <HomeContainer data-testid="home" bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}>
        <HomeStickyContainer>
          <SideBar />
        </HomeStickyContainer>
        <HomeSideContainer bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}>
          {renderAllVideos()}
        </HomeSideContainer>
      </HomeContainer>
    </div>
  );
};

export default GamingRoute;
