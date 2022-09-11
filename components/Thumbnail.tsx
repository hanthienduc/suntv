import Image from 'next/image'
import React from 'react'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'
import { useRecoilState } from 'recoil'
import { DocumentData } from 'firebase/firestore'
interface Props {
  movie: Movie | DocumentData
}
function Thumbnail({ movie }: Props) {

  const [, setShowModal] = useRecoilState(modalState)
  const [, setCurrentMovie] = useRecoilState(movieState)

  const handleOpenModal = () => {
    setCurrentMovie(movie)
    setShowModal(true)
  }

  return (
    <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200
    ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
      onClick={handleOpenModal}>
      <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md-rounded"
        layout='fill'
      />
    </div>
  )
}

export default Thumbnail