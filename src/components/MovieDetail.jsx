import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetail = ({ match }) => {
    const [movie, setMovie] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // Загрузка данных о фильме при монтировании компонента
        async function fetchMovie() {
            try {
                const movieId = match.params.id;
                const movieResponse = await axios.get(`/api/movies/${movieId}`); // Замените на ваш реальный эндпоинт для получения фильма
                setMovie(movieResponse.data);

                // Загрузка списка ролей для фильма
                const rolesResponse = await axios.get(`/api/movies/${movieId}/roles`); // Замените на ваш реальный эндпоинт для получения ролей фильма
                setRoles(rolesResponse.data);
            } catch (error) {
                console.error('Произошла ошибка при загрузке данных:', error);
            }
        }

        fetchMovie();
    }, [match.params.id]);

    return (
        <div>
            {movie && (
                <div>
                    <h1>{movie.title}</h1>
                    <p>Год выпуска: {movie.releaseYear}</p>
                    <p>Бюджет: {movie.budget}</p>
                    <p>Продолжительность: {movie.duration}</p>
                    <p>Жанры: {movie.genres.map((genre) => genre.name).join(', ')}</p>
                    {/* Отображайте остальные данные о фильме, если есть */}
                </div>
            )}
            <h2>Список ролей:</h2>
            <ul>
                {roles.map((role) => (
                    <li key={role.id}>
                        {`${role.actor.firstName} ${role.actor.lastName} (${role.actor.birthdate.getFullYear()}): ${role.characterName}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieDetail;
