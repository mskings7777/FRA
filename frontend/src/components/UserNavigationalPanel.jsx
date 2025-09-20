import React, { useContext } from 'react'
import AnimationWrapper from '../common/page-animation'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { removeFromSession } from '../common/Session'


export default function UserNavigationalPanel ({elements, classContent, signout, size, headerFirst}) {

  const navigate = useNavigate();
  const {userAuth: {username}, setUserAuth} = useContext(UserContext)

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({access_token: null});
    navigate('/signin');
  }

  return (
    <div>
      <AnimationWrapper
        transition={{duration:0.2, y: {duration: 0.1 } }}
        className="absolute mt-7 right-1 z-50"
      >

        <div className='bg-white text-green-900 shadow xs:fixed xs:left-1 xs:top-14 absolute right-0 w-60  duration-200'>

          {
            elements?.map((ele, i) => {
              let value = ele.split("-")[0]
              let url = ele.split("-")[1]
              return(
                <>
                {/* <Link className={`capitalize text-white flex gap-2 link  pl-8 py-${size} `}>
                  Accept as
                </Link> */}
                <Link key={i} to={`/${url}`} className={`capitalize flex gap-2 pl-8 py-3 bg-green-900/30 hover:opacity-70 ${(i==0 && headerFirst)? 'text-black bg-red-400' :'link' } `}>
                  {value}
                </Link>
                </>
              )
            })
          }

          {/* <Link to="/create" className='flex gap-2 link pl-8 py-4'>
            Accounts
          </Link>

          <Link to={`/user`} className='flex gap-2 link md:hidden pl-8 py-4'>
            Profile
          </Link>

          <Link to={`/user`} className='flex gap-2 link pl-8 py-4'>
            Create Series
          </Link>

          <Link className='flex gap-2 link pl-8 py-4'>
            Setting
          </Link> */}

          <span className='absolute border-t border-neutral-800 w-[100%] '></span>

          <button onClick={signOutUser} className={'text-left bg-green-900/40 hover:opacity-50 w-full pl-8 py-3 '+ signout}>
            <h1 className='font-bold text-xl mt-1'>Sign Out</h1>
            <p className='text-green-900/70'>@{username}</p>
          </button>

        </div>
      </AnimationWrapper>
    </div>
  )
}
