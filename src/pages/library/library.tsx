import { FC, useContext } from 'react';
import { RouteName, RouterContext } from '../../Router/RouterContext';

export const Library: FC = () => {
    const { navigate, getPath } = useContext(RouterContext);

    return (
        <>
            <h1>Library</h1>

            <ul>
                <li>
                    <button type="button" onClick={() => navigate(getPath(RouteName.LOGIN))}>
                        Login
                    </button>
                </li>
                <li>
                    <button type="button" onClick={() => navigate(getPath(RouteName.REGISTRATION))}>
                        Register
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={() => navigate(`${getPath(RouteName.VIDEO)}/name`)}
                    >
                        Video
                    </button>
                </li>
            </ul>
        </>
    );
};
