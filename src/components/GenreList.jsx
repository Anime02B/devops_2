import React, { useState } from 'react';

const GenreList = ({ genres, onGenreSelect }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleGenreClick = (genre) => {
        // Проверяем, выбран ли жанр
        const isGenreSelected = selectedGenres.includes(genre);

        if (isGenreSelected) {
            // Если выбран, удаляем его из выбранных
            const updatedGenres = selectedGenres.filter((selectedGenre) => selectedGenre !== genre);
            setSelectedGenres(updatedGenres);
        } else {
            // Если не выбран, добавляем его к выбранным
            setSelectedGenres([...selectedGenres, genre]);
        }
        // Вызываем функцию обратного вызова и передаем выбранный жанр
        onGenreSelect(genre);
    };

    return (
        <div>
            <h2>Выберите жанры:</h2>
            <div className="genre-list">
                {genres.map((genre) => (
                    <div
                        key={genre.id}
                        className={`genre-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                        onClick={() => handleGenreClick(genre)}
                    >
                        {genre.name}
                    </div>
                ))}
            </div>
            <h3>Выбранные жанры:</h3>
            <div className="selected-genres">
                {selectedGenres.map((selectedGenre) => (
                    <div key={selectedGenre} className="selected-genre">
                        {selectedGenre}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreList;
