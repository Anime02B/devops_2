import React, { useState } from 'react';
import axios from "axios";

const ActorForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthdate: '', // Добавлено поле для даты рождения
        height: '', // Добавлено поле для роста
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Отправьте данные на бэкенд для создания актера
        try {
            const actorData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthdate: formData.birthdate,
                height: formData.height,
            };
            // Ваш код для отправки данных на бэкенд
            const response = await axios.post('/api/actors', actorData); // Замените '/api/actors' на ваш реальный эндпоинт

            if (response.status === 200) {
                // Успешно сохранено, выполните необходимые действия
                console.log('Данные об актере успешно отправлены на бэкенд');
            }
        } catch (error) {
            console.error('Произошла ошибка при создании актера:', error);
        }
    };

    return (
        <div>
            <h1>Форма создания актера</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Фамилия:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>
                <div>
                    <label>Дата рождения:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Рост (в см):</label>
                    <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        required
                    />
                </div>
                {/* Добавьте другие поля, если необходимо */}
                <div>
                    <button type="submit">Создать актера</button>
                </div>
            </form>
        </div>
    );
};

export default ActorForm;
