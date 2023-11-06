import React, { useState, useEffect } from 'react';
import axios from "axios";

const MovieForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        title: '',
        releaseYear: '',
        budget: '',
        duration: '',
    });

    // Создаем состояние для выбранных жанров
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isEdit, setIsEdit] = useState(false); // Добавьте состояние для определения, выполняется ли редактирование
    const [genres, setGenres] = useState([]); // Список всех жанров
    const [selectedGenres, setSelectedGenres] = useState([]); // Список выбранных жанров

    useEffect(() => {
        // Загрузить список жанров из бэкенда
        axios.get('/api/genres')
            .then((response) => {
                setGenres(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке жанров:', error);
            });
    }, []); // Пустой массив зависимостей означает, что эффект будет выполнен один раз при монтировании компонента

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGenreSelect = (genre) => {
        // Проверяем, выбран ли жанр
        if (!selectedGenres.some((selectedGenre) => selectedGenre.id === genre.id)) {
            // Если не выбран, добавляем его к выбранным
            setSelectedGenres(selectedGenres.concat(genre));
        }
    };

    const handleGenreDeselect = (genre) => {
        // Удаление жанра из выбранных
        setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre.id !== genre.id));
    };

    const handleGenreToggle = (genre) => {
        if (selectedGenres.includes(genre)) {
            // Если жанр уже выбран, убираем его из выбранных
            setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre.id !== genre.id));
        } else {
            // Если жанр не выбран, добавляем его к выбранным
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Подготовьте данные для отправки на бэкенд
        const movieData = {
            title: formData.title,
            releaseYear: formData.releaseYear,
            budget: formData.budget,
            duration: formData.duration,
            genres: selectedGenres.map((genre) => genre.id), // Отправляем только идентификаторы выбранных жанров
        };

        // отправка данных на бэкенд
        try {
            const response = await axios.post('/api/movies', movieData);
            if (response.status === 200) {
                // Успешно сохранено, выполните необходимые действия
                setSuccessMessage('Фильм успешно сохранен на сервере.');
                setErrorMessage(null);
                // Очистить форму или выполнить другие действия по вашему усмотрению
            }
        } catch (error) {
            // Обработайте ошибку, если сохранение не удалось
            setErrorMessage('Произошла ошибка при сохранении фильма.');
            setSuccessMessage(null);

        }
        onSubmit(movieData);
    };



    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Название фильма:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Год выпуска:</label>
                <input
                    type="number"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Бюджет:</label>
                <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Продолжительность (мин):</label>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Выберите жанры:</label>
                <div className="genre-list">
                    {genres.map((genre) => (
                        <div
                            key={genre.id}
                            className={`genre-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                            onClick={() => handleGenreToggle(genre)}
                        >
                            {genre.name}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label>Выбранные жанры:</label>
                <div className="selected-genres">
                    {selectedGenres.map((selectedGenre) => (
                        <div
                            key={selectedGenre.id}
                            className="selected-genre"
                            onClick={() => handleGenreToggle(selectedGenre)}
                        >
                            {selectedGenre.name}
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit">Сохранить фильм</button>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

        </form>

    );
};

export default MovieForm;
