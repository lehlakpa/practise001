import React from 'react'
import BannerCarousel from '../component/Banner'
//import Header from '../component/Header'
import Header from '../component/header'
import Footer from '../component/Footer'
import Packages from '../component/Packages'

function Home() {
  return (
    <div>
      <Header/>
        <BannerCarousel/>
        <Packages/>
        <Footer/>
    </div>
  )
}

export default Home