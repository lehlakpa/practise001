import React from 'react'
import BannerCarousel from '../component/Banner'
import Header from '../component/header'
import Footer from "../component/footer";
import Packages from '../component/Packages'

function Home() {
  return (
    <div className="relative overflow-hidden">

      {/* 🔵🔴 Blurry Background Circles */}
      <div className="absolute inset-0 -z-10">
        
        {/* Blue Circle */}
        <div className="absolute top-10 left-5 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-40"></div>
        
        {/* Red Circle */}
        <div className="absolute top-52 right-10 w-80 h-80 bg-red-500 rounded-full blur-[140px] opacity-40"></div>

        {/* Purple Mixed Circle */}
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-30"></div>

      </div>

      {/* Page Content */}
      <Header />
      <div className="pt-20">
        <BannerCarousel />
      </div>
      <Packages />
      <Footer />

    </div>
  )
}

export default Home
