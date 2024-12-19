import { useContext } from 'react'
import CartContext from '../../context/CartContext'
import { NotFoundContainer, Heading, Desc, Image } from './styledComponents'

const NotFound = () => {
  const { isDarkTheme } = useContext(CartContext) // UseContext for cleaner code

  const imageUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

  const themeColors = {
    container: isDarkTheme ? 'black' : 'white',
    heading: isDarkTheme ? 'white' : 'black',
    desc: isDarkTheme ? 'white' : 'black',
  }

  return (
    <NotFoundContainer isDark={themeColors.container}>
      <Image src={imageUrl} alt="not found" />
      <Heading isDark={themeColors.heading}>Page Not Found</Heading>
      <Desc isDark={themeColors.desc}>
        We are sorry, the page you requested could not be found.
      </Desc>
    </NotFoundContainer>
  )
}

export default NotFound
