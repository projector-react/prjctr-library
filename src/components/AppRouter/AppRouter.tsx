import { FC } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Library, Login, Registration, Video } from '../../pages';
import { RouteName, RouterProvider } from '../../Router';

export const AppRouter: FC = () => (
    <BrowserRouter>
        <RouterProvider>
            <Routes>
                <Route path={RouteName.LIBRARY} element={<Library />} />
                <Route path={RouteName.LOGIN} element={<Login />} />
                <Route path={RouteName.REGISTRATION} element={<Registration />} />
                <Route path={`${RouteName.VIDEO}/:name`} element={<Video />} />
            </Routes>
        </RouterProvider>
    </BrowserRouter>
);
