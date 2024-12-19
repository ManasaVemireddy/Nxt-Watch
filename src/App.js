import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginForm from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideoDetails from './components/VideoItemDetailsRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'

import CartContext from './context/CartContext'

import './App.css'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])
  const [activeTab, setActiveTab] = useState('HOME')

  const onChangeTheme = () => {
    setIsDarkTheme(prev => !prev)
  }

  const addToSaveVideos = videoDetails => {
    const videoObject = savedVideos.find(each => each.id === videoDetails.id)
    if (!videoObject) {
      setSavedVideos(prev => [...prev, videoDetails])
    }
  }

  const removeSaveVideos = id => {
    setSavedVideos(prev => prev.filter(each => each.id !== id))
  }

  const activeTabItem = item => {
    setActiveTab(item)
  }

  return (
    <CartContext.Provider
      value={{
        isDarkTheme,
        savedVideos,
        addToSaveVideos,
        activeTabItem,
        activeTab,
        onChangeTheme,
        removeSaveVideos,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/trending" element={<TrendingRoute />} />
          <Route path="/gaming" element={<GamingRoute />} />
          <Route path="/saved-videos" element={<SavedVideosRoute />} />
          <Route path="/videos/:id" element={<VideoDetails />} />
        </Route>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </CartContext.Provider>
  )
}

export default App
