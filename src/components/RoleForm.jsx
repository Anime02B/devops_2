import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleForm = () => {
    const [formData, setFormData] = useState({
        actorId: '',
        movieId: '',
        characterName: '',
    });

    const [actors, setActors] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Загрузка списка актеров и фильмов при загрузке компонента
        async function fetchActorsAndMovies() {
            try {
                const actorsResponse = await axios.get('/api/actors'); // Замените на ваш реальный эндпоинт для получения актеров
                const moviesResponse = await axios.get('/api/movies'); // Замените на ваш реальный эндпоинт для получения фильмов

                setActors(actorsResponse.data);
                setMovies(moviesResponse.data);
            } catch (error) {
                console.error('Произошла ошибка при загрузке данных:', error);
            }
        }

        fetchActorsAndMovies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const roleData = {
                actorId: formData.actorId,
                movieId: formData.movieId,
                characterName: formData.characterName,
            };

            // Отправьте данные на бэкенд
            const response = await axios.post('/api/roles', roleData); // Замените на ваш реальный эндпоинт для создания ролей

            if (response.status === 200) {
                // Успешно сохранено, выполните необходимые действия
                console.log('Данные о роли успешно отправлены на бэкенд');
            }
        } catch (error) {
            console.error('Произошла ошибка при создании роли:', error);
        }
    };

    return (
        <div>
            <h1>Форма создания роли</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Выберите фильм:</label>
                    <select
                        name="movieId"
                        value={formData.movieId}
                        onChange={(e) => setFormData({ ...formData, movieId: e.target.value })}
                        required
                    >
                        <option value="" disabled>
                            Выберите фильм
                        </option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {`${movie.title} (${movie.releaseYear})`}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Выберите актера:</label>
                    <select
                        name="actorId"
                        value={formData.actorId}
                        onChange={(e) => setFormData({ ...formData, actorId: e.target.value })}
                        required
                    >
                        <option value="" disabled>
                            Выберите актера
                        </option>
                        {actors.map((actor) => (
                            <option key={actor.id} value={actor.id}>
                                {`${actor.firstName} ${actor.lastName} (${actor.birthdate.getFullYear()})`}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Имя персонажа:</label>
                    <input
                        type="text"
                        name="characterName"
                        value={formData.characterName}
                        onChange={(e) => setFormData({ ...formData, characterName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Создать роль</button>
                </div>
            </form>
        </div>
    );
};

export default RoleForm;
