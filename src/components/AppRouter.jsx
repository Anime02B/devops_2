import React from 'react';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MovieList from './MovieList';
import MovieDetail from './MovieDetail';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Маршрут для страницы списка фильмов */}
                <Route path="/movies" element={<MovieList />} />

                {/* Маршрут для страницы с подробной информацией о фильме */}
                <Route path="/movies/:id" element={<MovieDetail />} />

                {/* Другие маршруты, если необходимо */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
