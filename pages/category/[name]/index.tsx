import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../../../atoms/modalAtom'
import Header from '../../../components/Header'
import Modal from '../../../components/Modal'
import Plans from '../../../components/Plans'
import Row from '../../../components/Row'
import Thumbnail from '../../../components/Thumbnail'
import useAuth from '../../../hooks/useAuth'
import { useList } from '../../../hooks/useList'
import useSubscription from '../../../hooks/useSubscription'
import payments from '../../../lib/stripe'
import { Movie } from '../../../typings'
import { movieRequests, tvShowRequests } from '../../../utils/request'

interface Props {
  tvAiringToday: Movie[],
  tvOntheAir: Movie[],
  tvPopular: Movie[],
  tvTopRated: Movie[],
  movieNowPLaying: Movie[],
  movieUpcoming: Movie[],
  movieTopRated: Movie[],
  moviePopular: Movie[]

  products: Product[]
}

function CategoryPage({
  tvAiringToday,
  tvOntheAir,
  tvPopular,
  tvTopRated,
  movieNowPLaying,
  movieUpcoming,
  movieTopRated,
  moviePopular,
  products
}: Props) {

  const router = useRouter()
  const name = router.query.name as string

  const { user, loading } = useAuth()
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)
  const subscription = useSubscription(user)

  const [, setShowModal] = useRecoilState(modalState)
  const [, setCurrentMovie] = useRecoilState(movieState)

  const handleOpenModal = () => {
    setCurrentMovie(movie)
    setShowModal(true)
  }

  if (loading || subscription === null) return null

  if (!subscription) return (<Plans products={products} />)

  return (
    <div className='mt-28'>
      <Header />
      <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition 
      duration-200 hover:text-white
      md:text-2xl pl-8 pb-8
      '>{name === 'tv-show' ? 'TV Shows' : name === 'movies' ? 'movies' : 'My List'}</h2>
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        {name === 'tv-show' ? (
          <section className='md:space-y-24'>
            <Row title="Airing Today" movies={tvAiringToday} />
            <Row title="On The Air" movies={tvOntheAir} />
            <Row title="Popular" movies={tvPopular} />
            <Row title="Top Rated" movies={tvTopRated} />
          </section>
        ) : name === 'movies' ? (
          (
            <section className='md:space-y-24'>
              <Row title="Now Playing" movies={movieNowPLaying} />
              <Row title="Upcoming" movies={movieUpcoming} />
              <Row title="Top Rated" movies={movieTopRated} />
              <Row title="Popular" movies={moviePopular} />
            </section>
          )
        ) : (
          <div className='grid grid-cols-5 gap-4'>
            {list.map((movie) => {
              return <div className='relative h-28  cursor-pointer transition duration-200
              ease-out md:h-36 md:hover:scale-105'
                onClick={handleOpenModal}>
                <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                  }`}
                  className="rounded-sm object-cover md-rounded"
                  layout='fill'
                />
              </div>
            })}
          </div>
        )}
      </main>
      {/* Modal */}
      {showModal && <Modal />}
    </div>
  )
}

export default CategoryPage


export const getServerSideProps = async () => {

  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true
  }).then((res) => res)
    .catch(error => console.log(error.message))

  const [
    tvAiringToday,
    tvOntheAir,
    tvPopular,
    tvTopRated,
    movieNowPLaying,
    movieUpcoming,
    movieTopRated,
    moviePopular
  ] = await Promise.all([
    fetch(tvShowRequests.fetchTVAiringToday).then((res) => res.json()),
    fetch(tvShowRequests.fetchTVOnTheAir).then((res) => res.json()),
    fetch(tvShowRequests.fetchPopular).then((res) => res.json()),
    fetch(tvShowRequests.fetchTopRated).then((res) => res.json()),
    fetch(movieRequests.fetchNowPlaying).then((res) => res.json()),
    fetch(movieRequests.fetchUpcoming).then((res) => res.json()),
    fetch(movieRequests.fetchTopRated).then((res) => res.json()),
    fetch(movieRequests.fetchPopular).then((res) => res.json()),
  ])

  return {
    props: {
      tvAiringToday: tvAiringToday.results,
      tvOntheAir: tvOntheAir.results,
      tvPopular: tvPopular.results,
      tvTopRated: tvTopRated.results,
      movieNowPLaying: movieNowPLaying.results,
      movieUpcoming: movieUpcoming.results,
      movieTopRated: movieTopRated.results,
      moviePopular: moviePopular.results,
      products
    }
  }
}