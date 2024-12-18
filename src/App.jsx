import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home/Home'
import SearchResults from './pages/SearchResults/SearchResults'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Wishlist from './pages/Wishlist/Wishlist'
import PropertyDetail from './pages/PropertyDetail/PropertyDetail'
import PageNotFound from './pages/PageNotFound'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/search",
    element: <SearchResults/>,
  },
  {
    path: "/wishlist",
    element: <Wishlist/>
  },
  {
    path: "/property/:id",
    element: <PropertyDetail/>
  },
  {
    path: "*",
    element: <PageNotFound/>
  }
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
