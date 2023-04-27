## Aat Rutten Energy Web recruitment task

This repo contains a solution to [this challenge](https://github.com/dwojno/ewf-ts-task).

### Assumptions 
Since this is an algorithmic challenge it purely focuses on creating the most efficient matching algorithm. For this reason the following requirements have been ignored:
* A beautiful responsive front end
* Error handling
* Configurability:
  * Ability to specify different data sources
  * Ability to specify matching / filtering rules
* Pagination of results

### Time complexity
The time complexity of the `getRandomMovie()` function is `O(1)` because generating a random number and accessing a single element in an array can be done in the same amount of time regardless of the size of the array.

The time complexity of the `findMovies()` function can be broken down as follows:
  * The loop that calculates number of matched genres if `O(n)` because it loops over every movie once.
  * Adding movies to the `groupedMovies` map also has a time complexity of `O(n)` because it performs one operation for each movie.
  * The sorting operation of the scores has a time complexity of `O(n log n)` in the worst case scenario where all movies have a different score and `O(1)` in the best case where all movies have the same score.
  * The loop that adds movies to the `results` array has a time complexity of `O(n)` because it iterates over every score group and every move in the score group once.

In the worst case the time complexity of the `findMovies()` function is dominated by sorting the scores `O(n log n)`. In the best case where all movies have the same score the time complexity is O(n).


