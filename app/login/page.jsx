import React from 'react'
import MainNavbar from '../Components/MainNavbar'
import Footer from '../Components/Footer'

const Page = () => {
  return (
    <div>
        <div className='mx-28'>
            <MainNavbar />
        </div>
        <div className='bg-main '>
          <span className='mx-28 flex h-[500px] justify-center items-center text-white text-4xl font-bold'>Coming Soon !!!!!!</span>
        </div>
        <div>
      <Footer />
    </div>
    </div>
  )
}

export default Page
