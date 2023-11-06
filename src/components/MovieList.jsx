import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Загрузите список фильмов с бэкенда при монтировании компонента
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies'); // Замените URL на ваш эндпоинт
                setMovies(response.data);
            } catch (error) {
                console.error('Произошла ошибка при загрузке фильмов:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Список фильмов</h1>
            <div className="movie-list">
                {movies.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
