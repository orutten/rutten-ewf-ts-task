import { Genre, Movie } from "./index.types"
import { genres as genresData, movies as moviesData } from "./db.json";

const genres: Genre[] = genresData as Genre[];
const movies: Movie[] = moviesData as Movie[];

console.log(getRandomMovie());

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  if (genres.length === 0) {
    return getRandomMovie()
  }

  return [];
}

/**
 * Returns a random number between start and end
 * 
 * @param start Number
 * @param end Number
 * @returns randomNumber Number
 */
function generateRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

/**
 * Returns a movie at random from an array
 * 
 * @returns Movie
 */
function getRandomMovie() {
  return [movies[generateRandomNumber(0, movies.length - 1)]];
}