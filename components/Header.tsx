import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid/'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import BasicMenu from './BasicMenu'
function Header() {

  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      return window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled ? 'bg-[#141414]' : ''}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href={'/'}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink cursor-default font-semibold text-white hover:text-white">
            <Link href='/'>Home</Link>
          </li >
          <li className="headerLink">
            <Link href={`/category/tv-show`}>TV Shows</Link>
          </li>
          <li className="headerLink">
            <Link href={`/category/movies`}>Movies</Link>
          </li>
          <li className="headerLink">
            <Link href={`/category/my-list`}>My List</Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center space-x-4 text-sm font-light'>
        <Link href={'/search'}>
          <MagnifyingGlassIcon className='cursor-pointer hidden w-6 h-6 sm:inline' />
        </Link>
        <p className='cursor-pointer hidden lg:inline'>Kids</p>
        <BellIcon className='cursor-pointer h-6 w-6' />
        <Link href='/account'>
          <img
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header