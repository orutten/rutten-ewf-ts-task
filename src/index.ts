import { Genre, Movie } from "./index.types"
import { genres as genresData, movies as moviesData } from "./db.json";

const genres: Genre[] = genresData as Genre[];
const movies: Movie[] = moviesData as Movie[];

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  if (genres.length === 0) {
    return getRandomMovie();
  } else {
    return findMovies(genres);
  }
}

/**
 * Returns a random number between a given start and end
 * 
 * @param start Number
 * @param end Number
 * @returns randomNumber Number
 */
function generateRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

/**
 * Returns a movie at a random index from the movies data
 * 
 * @returns Movie
 */
function getRandomMovie() {
  return [movies[generateRandomNumber(0, movies.length - 1)]];
}

/**
 * Return an array of movies that match the genres being passed to the function.
 * 
 * Each movie is given a score based on how many of its genres match the genres passed to the function.
 * 
 * The results are sorted by highest match score descending.
 * 
 * @param genres Genre[]
 * @returns Movie[]
 */
function findMovies(genres: Genre[]): Movie[] {
  const results: Movie[] = [];
  // group movies by percentage of matched genres
  const groupedMovies: Map<number, Movie[]> = new Map();
  // sort movies by genre length in ascending order so we can exit the loop early
  // when there are movies with more genres than being search
  const sortedMovies: Movie[] = movies.sort((a, b) => a.genres.length - b.genres.length);

  // for every movie count the number of matched genres and calculate its score as a percent of genres that match
  for (const movie of sortedMovies) {
    // const matchedGenres = movie.genres.filter((genre) => genres.includes(genre as Genre));
    const matchedGenres = new Set(movie.genres.filter((genre) => genres.includes(genre as Genre)));

    const percentMatch = Math.round((matchedGenres.size / genres.length) * 100);
    // ignore any movies that dont have any matching genres
    // ignore any movies that have more genres than the number of genres being searched
    // ignore any movies where matched genres doesnt equal the number of genres the movie has
    if (percentMatch > 0 && movie.genres.length <= genres.length && matchedGenres.size === movie.genres.length) {
      // check if we already have an entry in the groupedMovies Map with the number of matched genres
      if (!groupedMovies.has(percentMatch)) {
        groupedMovies.set(percentMatch, []);
      }

      // add the movie to the Map for the corresponding number of matched genres
      groupedMovies.get(percentMatch)?.push(movie);
    }
  }
  
  // sort scores from highest to lowest
  const sortedScores = Array.from(groupedMovies.keys()).sort((a, b) => b - a);

  // for each score group add the movies to the results array
  for (const score of sortedScores) {
    results.push(...groupedMovies.get(score) ?? []);
  }

  return results;
}