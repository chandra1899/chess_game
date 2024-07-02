"use client"
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { HomeLeft, HomeRight, HomeRightHidden } from '@/components'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Search } from '@/store/atoms/search'
import { HiddenHomeRIghtOn } from '@/store/atoms/hiddenHomeRIghtOn'
import { Session } from 'next-auth'

export interface MyGamesType {
  black : string,
  checkBlackToWhite : number,
  checkWhiteToBlack : number,
  gameStatus : string,
  roomName : string,
  white : string,
  _id : string,
  won? : string | undefined
}

interface Props {
  mygames : MyGamesType[],
  sessionData : Session
}

const HomeClient = ({mygames, sessionData} : Props) => {
    const setSearch=useSetRecoilState(Search)
    const [hiddenHomeRIghtOn,setHiddenHomeRIghtOn]=useRecoilState(HiddenHomeRIghtOn)
    const search=useRecoilValue(Search)
    return (
        <main>
          <div className='h-[100vh] w-[100vw] bg-black'>
          <nav className='flex flex-row h-[40px] w-[100vw] justify-between px-12 pr-24 pt-2 items-center bg-[#222222e6]'>
            <div className='flex w-[100%] xs:w-[60%] justify-around items-center'>
            <h3 className='hidden xs:block text-white font-medium text-[18px]'>ChessFocus</h3>
    
            <div className='flex flex-row w-auto'>
            <input
            type="text" 
            placeholder='Search'
            onChange={(e)=>{setSearch(e.target.value)}}
            value={search}
            className={`bg-gray-800 border-slate-500 border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 h-[33px] w-[60vw] xs:w-[270px] py-2 px-3  rounded-md outline-none focus:border-blue focus:bg-black rounded-l-full rounded-r-full focus:border-[0.1rem] focus:border-solid -ml-10 xs:ml-0 font-medium`}
            />
            <Image
            src={'/search.png'}
            height={2}
            width={30}
            className='-ml-10'
            alt='search'
            />
            </div>
            </div>      
            <button className='hidden xs:block h-[98%] mt-1 w-[75px] rounded-md bg-violet-700 font-medium hover:bg-violet-800 text-white ml-12'  onClick={async()=>{await signOut()}} >Log Out</button>
            <div className='flex xs:hidden flex-row justify-around items-center absolute right-2 top-1'>
            <Image
            src={'/logout.png'}
            height={40}
            width={40}
            className=' block xs:hidden mx-2 cursor-pointer'
            alt='search'
            onClick={async()=>{await signOut()}}
            />
           {hiddenHomeRIghtOn?<Image
            src={'/close.svg'}
            height={30}
            width={30}
            className=' block xs:hidden cursor-pointer'
            alt='search'
            onClick={()=>{setHiddenHomeRIghtOn((pre)=>!pre)}}
            />:<Image
            src={'/menu.svg'}
            height={30}
            width={30}
            className=' block xs:hidden cursor-pointer'
            alt='search'
            onClick={()=>{setHiddenHomeRIghtOn((pre)=>!pre)}}
            />}
            </div>
          </nav>
    
          <div className='flex flex-row justify-around relative'>
            <HomeLeft myGames = {mygames} />
            <HomeRight sessionData = {sessionData} />
            {hiddenHomeRIghtOn && <HomeRightHidden/>}
          </div>
          </div>      
        </main>
      )
}

export default HomeClient
