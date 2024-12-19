import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { ThreeCircles } from 'react-loader-spinner'
import { AiOutlineSearch } from 'react-icons/ai'

import VideoCard from '../VideoItems'
import CartContext from '../../context/CartContext'
import {
  SearchVideosContainer,
  SearchInput,
  VideosContainer,
  ProductsLoaderContainer,
  NotFoundContainer,
  Image,
  Heading,
  Desc,
  NavLink,
  Retry,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SearchVideos = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchedVideos, setSearchedVideos] = useState([])

  const { isDarkTheme } = useContext(CartContext)

  useEffect(() => {
    if (searchValue) getSuggestionVideos()
  }, [searchValue])

  const getSuggestionVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchValue}`
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.videos.map(each => ({
          id: each.id,
          channel: { name: each.channel.name, profileImageUrl: each.channel.profile_image_url },
          publishedAt: each.published_at,
          thumbnailUrl: each.thumbnail_url,
          viewCount: each.view_count,
          title: each.title,
        }))
        setSearchedVideos(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const onSearchInputChange = (event) => setSearchInput(event.target.value)
  const onSearchButtonClick = () => setSearchValue(searchInput)
  const onEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchValue(searchInput)
    }
  }

  const renderLoadingView = () => (
    <ProductsLoaderContainer data-testid="loader">
      <ThreeCircles type="ThreeCircles" color="#0b69ff" height={50} width={50} />
    </ProductsLoaderContainer>
  )

  const renderHomeVideos = () => {
    const bgColor = isDarkTheme ? '#231f20' : '#f9f9f9'
    const isVideosAvailable = searchedVideos.length === 0

    return isVideosAvailable ? (
      <div>
        <Image
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <Heading>No Search results found</Heading>
        <Desc>Try different key words or remove search filter</Desc>
        <Retry onClick={getSuggestionVideos}>Retry</Retry>
      </div>
    ) : (
      <SearchVideosContainer bgColor={bgColor}>
        <div>
          <SearchInput
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={onSearchInputChange}
            onKeyDown={onEnterKeyPress}
          />
          <button type="button" onClick={onSearchButtonClick}>
            <AiOutlineSearch />
          </button>
        </div>
        <VideosContainer>
          {searchedVideos.map((each) => (
            <VideoCard key={each.id} details={each} />
          ))}
        </VideosContainer>
      </SearchVideosContainer>
    )
  }

  const renderFailureView = () => (
    <NotFoundContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <Heading>Oops! Something Went Wrong</Heading>
      <Desc>We are having some trouble to complete your request. Please try again.</Desc>
      <NavLink>
        <Retry onClick={getSuggestionVideos}>Retry</Retry>
      </NavLink>
    </NotFoundContainer>
  )

  const renderAllVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderHomeVideos()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <>{renderAllVideos()}</>
}

export default SearchVideos
