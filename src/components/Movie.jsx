import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.id}`} className="movie-link">
            <div className="movie">
                <h2>{movie.title}</h2>
                <p>Год выпуска: {movie.releaseYear}</p>
                <p>Жанры: {movie.genres.map((genre) => genre.name).join(', ')}</p>
                <p>Длительность: {movie.duration} мин</p>
            </div>
        </Link>
    );
};

export default Movie;
