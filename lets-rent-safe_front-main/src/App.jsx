import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ForDevelopersPage from './pages/ForDevelopersPage/ForDevelopersPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import { AuthProvider } from './сontext/AuthContext.jsx';

const LayoutRoute = () => {
    useEffect(() => {
        document.body.classList.remove('js-loading');
    }, []);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                <Route element={<LayoutRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/project/:projectId" element={<ProjectPage />} />
                    <Route path="/developers" element={<ForDevelopersPage />} />
                    <Route path="/about" element={<AboutPage />} />

                    <Route
                        path="/favorites"
                        element={
                            <PrivateRoute>
                                <FavoritesPage />
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;