import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className='absolute top-14.5 w-screen h-screen bg-white left-0'>
            <div className='z-30 absolute left-1/2 top-[25%] -translate-x-1/2 text-white text-5xl'>Welcome to VanSetu</div>
            <div className='z-30 absolute left-1/2 top-[33%] -translate-x-1/2 text-white text-5xl'>Atlas & WebGIS DSS Portal</div>
            <div className='z-30 absolute left-1/2 top-[41%] -translate-x-1/2 text-white text-xl'>Empowering communities through data-driven forest rights monitoring and</div>
            <div className='z-30 absolute left-1/2 top-[44%] -translate-x-1/2 text-white text-xl'>transparent governance</div>


            
            <div className='z-20 absolute bg-green-900 w-full h-[70vh] opacity-30 flex justify-center'></div>
            <video autoPlay loop muted className="z-10 w-screen h-[70vh] object-cover ">
              <source src="https://static.vecteezy.com/system/resources/previews/030/904/031/mp4/a-forest-with-tall-grass-and-trees-at-sunset-free-video.mp4" type="video/mp4" />
            </video>

            <div className='w-screen h-[30vh] flex md:space-x-32 space-x-1 text-teal-900 bg-green-900/30 justify-center py-11'>

                <div className='space-y-2'>
                    <FontAwesomeIcon className='px-7 md:text-4xl text-sm flex justify-center' icon={faUser} />
                    <div className=''>
                        <div className='md:text-2xl text-xs'>24534594</div>
                        <div className='text-xs px-4'>FRA Claims</div>
                    </div>
                </div>

                <div className='space-y-2'>
                    <FontAwesomeIcon className='px-7 md:text-4xl text-sm flex justify-center' icon={faLocationDot} />
                    <div className=''>
                        <div className='md:text-2xl text-xs'>24534594</div>
                        <div className='text-xs px-3'>Titles Granted</div>
                    </div>
                </div>

                <div className='space-y-2'>
                    <FontAwesomeIcon className='md:text-4xl text-sm flex justify-center ml-5' icon={faChartSimple} />
                    <div className=''>
                        <div className='md:text-2xl text-xs ml-7'>28</div>
                        <div className='text-xs'>States Covered</div>
                    </div>
                </div>

                <div className='space-y-2'>
                    <FontAwesomeIcon className='md:text-4xl text-sm ml-8' icon={faMagnifyingGlass} />
                    <div className='md:text-2xl text-xs'>
                        <div className='ml-6'>56000</div>
                        <div className='text-xs'>Pending Applications</div>
                    </div>
                </div>

            </div>

        <div className='w-screen h-screen text-gray-600 text-3xl'>
                <div className='pt-20'>
                    man
                </div>
        </div>


    </div>
  )
}
