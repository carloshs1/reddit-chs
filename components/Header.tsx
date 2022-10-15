import Image from 'next/image'
import React from 'react'
import {
 Bars3Icon,
 ChevronDownIcon,
 HomeIcon,
 MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import {
 BellIcon,
 ChatBubbleOvalLeftEllipsisIcon,
 GlobeAmericasIcon,
 PlusIcon,
 SparklesIcon,
 MegaphoneIcon,
 VideoCameraIcon,
} from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'

const Header: React.FC = () => {
 const { data: session } = useSession()
 return (
  <header className="flex sticky top-0 z-50 bg-white px-4 py-2 shadow-sm items-center">
   <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
    <Image
     src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png"
     alt="Reddit Logo"
     layout="fill"
     objectFit="contain"
    />
   </div>

   <div className="flex items-center mx-7 lg:min-w-[160px]">
    <HomeIcon className="h-5 w-5" />
    <p className="flex-1 ml-2 hidden lg:inline">Home</p>
    <ChevronDownIcon className="h-5 w-5" />
   </div>

   <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-md bg-gray-100 px-3 py-1">
    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
    <input
     className="flex-1 bg-transparent outline-none"
     type="text"
     placeholder="Search Reddit"
    />
    <button type="submit" hidden />
   </form>

   <div className="text-gray-500 space-x-2 mx-5 items-center hidden lg:inline-flex">
    <SparklesIcon className="icon" />
    <GlobeAmericasIcon className="icon" />
    <VideoCameraIcon className="icon" />
    <hr className="h-10 border-gray-100" />
    <ChatBubbleOvalLeftEllipsisIcon className="icon" />
    <BellIcon className="icon" />
    <PlusIcon className="icon" />
    <MegaphoneIcon className="icon" />
   </div>
   <div className="ml-5 flex items-center lg:hidden">
    <Bars3Icon className="icon" />
   </div>

   <div
    onClick={() => (session ? signOut() : signIn())}
    className="hidden lg:flex lg:max-w-[120px] xl:max-w-none items-center cursor-pointer space-x-2 border border-gray-100 p-2"
   >
    <div className="relative h-5 w-5 flex-shrink-0 cursor-pointer">
     <Image
      src="https://cdn-icons-png.flaticon.com/512/52/52053.png"
      alt="Reddit Logo"
      layout="fill"
      objectFit="contain"
     />
    </div>
    {session ? (
     <>
      <div className="flex-1 text-xs truncate">
       <p className="truncate">{session?.user?.name}</p>
       <p className="text-gray-400">1 Karma</p>
      </div>
      <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
     </>
    ) : (
     <p className="text-gray-400">Sign in</p>
    )}
   </div>
  </header>
 )
}

export default Header
