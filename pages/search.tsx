import { DocumentData } from "firebase/firestore"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { SyntheticEvent, useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { Movie } from "../typings"

// https://api.themoviedb.org/3/search/multi?api_key=1d99fd8308d11d4da88f5ec8c7fa1d73&language=en-US&page=1&query=thor&include_adult=false
function Search() {

  const [searchInput, setSearchInput] = useState('')
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const showModal = useRecoilValue(modalState)
  const [, setShowModal] = useRecoilState(modalState)
  const [, setCurrentMovie] = useRecoilState(movieState)



  const handleOpenModal = (movie: Movie | DocumentData) => {
    setCurrentMovie(movie)
    setShowModal(true)
  }

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault()
    const results = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1&query=${searchInput}&include_adult=false`)
      .then((res) => res.json()).then((resJson) => resJson.results)
    setMovies(results)
  }

  return (
    <>
      <Head>
        <title>
          Search - SunTV
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-center my-[100px] mx-6">
        <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
          <div className="flex flex-col items-stretch gap-3">
            <h1 className="text-2xl">Search for your favorite movies</h1>
            <form onSubmit={handleSearch} className="w-full mt-4 flex items-center px-12">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd">
                    </path>
                  </svg>
                </div>
                <input type="text" id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.currentTarget.value)}
                />
              </div>
              <button type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                  </path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>

          <div className="mt-8 w-full">
            <h1 className="text-lg mb-3 pl-5">Search result</h1>
            {movies && <div className="flex flex-col gap-3">
              {movies.map(movie => {
                return <div className="cursor-pointer flex gap-2 hover:brightness-75 transition duration-300"
                  onClick={() => handleOpenModal(movie)}
                >
                  <div className="w-[100px] h-[60px] flex-shrink-0">
                    <span className=" lazy-load-image-background opacity lazy-load-image-loaded"
                      style={{ color: 'transparent', display: 'inline-block', height: '60px', width: '100px' }}>
                      <Image className="w-[100px] h-[60px] object-cover rounded-lg"
                        alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                          }`} width="100" height="60" />
                    </span>
                  </div>
                  <div>
                    <h1>{movie.title || movie.original_name}</h1>
                  </div>
                </div>
              })}
            </div>}
          </div>
        </div>
        {/* Modal */}
        {showModal && <Modal />}
      </div>
    </>
  )
}

export default Search