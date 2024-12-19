import { Component } from 'react'
import { IoMdClose } from 'react-icons/io'
import Header from '../Header'
import SearchVideos from '../SearchVideos'
import CartContext from '../../context/CartContext'
import {
  HomeContainer,
  HomeSideContainer,
  BannerImage,
  HomeStickyContainer,
  CloseButton,
  ModalContainer,
  GetItNowButton,
  BannerImageContainer,
} from './styledComponents'
import SideBar from '../SideBar'

class HomeRoute extends Component {
  state = { display: 'flex' }

  onCloseBanner = () => {
    this.setState({ display: 'none' }) // No need to call renderHomeVideos here
  }

  renderHomeVideos = () => {
    const { display } = this.state

    return (
      <>
        <BannerImageContainer data-testid="banner" display={display}>
          <ModalContainer>
            <BannerImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <p>Buy Nxt Watch Premium</p>
            <GetItNowButton>GET IT NOW</GetItNowButton>
          </ModalContainer>
          <CloseButton
            type="button"
            data-testid="close"
            onClick={this.onCloseBanner}
          >
            <IoMdClose size={20} color="#231f20" />
          </CloseButton>
        </BannerImageContainer>
        <SearchVideos />
      </>
    )
  }

  render() {
    return (
      <CartContext.Consumer>
        {({ isDarkTheme }) => {
          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'

          return (
            <div data-testid="home">
              <Header />
              <HomeContainer bgColor={bgColor}>
                <HomeStickyContainer>
                  <SideBar />
                </HomeStickyContainer>
                <HomeSideContainer bgColor={bgColor}>
                  {this.renderHomeVideos()}
                </HomeSideContainer>
              </HomeContainer>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default HomeRoute
