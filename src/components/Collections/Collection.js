import React, { useEffect, useState } from 'react'
import Carousel from '../Carousel/Carousel';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies } from "../../redux/features/movies/moviesSlice";

const Collection = ({ title }) => {
  const [tvActive, setTvActive] = useState(false);
const dispatch = useDispatch();

const { trendingMovies, popularMovies, topRatedMovies } = useSelector((state) => state.movies);

useEffect(() => {
  switch (title) {
    case "Trending":
      if (trendingMovies.data.length === 0) {
        dispatch(fetchTrendingMovies());
      }
      break;
    case "What's Popular":
      if (popularMovies.data.length === 0) {
        dispatch(fetchPopularMovies());
      }
      break;
    case "Top Rated":
      if (topRatedMovies.data.length === 0) {
        dispatch(fetchTopRatedMovies());
      }
      break;
    case "Similar Movies":
      if (trendingMovies.data.length === 0) {
        dispatch(fetchTrendingMovies());
      }
      break;
    case "popularMovies":
      if (popularMovies.data.length === 0) {
        dispatch(fetchPopularMovies());
      }
      break;
    default:
  }
}, [dispatch, title]);
  
  let content = null;
  let categoryState;

  switch (title) {
    case "Trending":
      categoryState = trendingMovies;
      break;
    case "What's Popular":
      categoryState = popularMovies;
      break;
    case "Top Rated":
      categoryState = topRatedMovies;
      break;
    case "Similar Movies":
      categoryState = trendingMovies;
      break;
    case "Recommendations":
      categoryState = popularMovies;
      break;
    default:
  }

  if (categoryState.isLoading) content = <p>Loading...</p>;

  if (!categoryState.isLoading && categoryState.isError)
    content = <p className="error">{categoryState.error}</p>;

  if (
    !categoryState.isLoading &&
    !categoryState.isError &&
    categoryState.data?.length > 0
  ) {
    content = <Carousel data={categoryState.data} />;
  }
  return (
    <div className="w-full mx-auto my-14">
      <div className="mb-5 ml-1 flex justify-between items-center">
        <h2 className="text-2xl font-semibold w-fit">{title}</h2>
        <div className="w-fit">
          <label
            for="Toggle"
            className="flex items-center p-1 text-sm font-semibold cursor-pointer bg-white text-gray-800 rounded-3xl overflow-hidden"
          >
            <input id="Toggle" type="checkbox" className="hidden peer" />
            <span className="px-2 py-1 rounded-2xl duration-7000 bg-success peer-checked:bg-transparent">
              Movies
            </span>
            <span className="px-2 py-1  rounded-2xl duration-7000 bg-transparent peer-checked:bg-success">
              Tv Shows
            </span>
          </label>
        </div>
      </div>
      <div className="w-full flex gap-6">
        {/* <Carousel data={data} /> */}
        {content}
      </div>
    </div>
  );
}

export default Collection