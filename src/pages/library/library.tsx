import { FC, useContext } from 'react';
import { RouteName, RouterContext } from '../../Router/RouterContext';
import { useAuthState } from '../../Auth/AuthContext';

export const Library: FC = () => {
    const { navigate, getPath } = useContext(RouterContext);
    const { isAuthenticated, actions } = useAuthState();

    const mockUser = {
        username: 'projector_user',
        password: 'projector'
    };

    return (
        <>
            <h1>Library</h1>

            <h2>isAuthenticated:{isAuthenticated ? 'true' : 'false'}</h2>

            {!isAuthenticated ? (
                <button type="button" onClick={() => actions.login(mockUser)}>
                    Submit Login
                </button>
            ) : (
                <button type="button" onClick={actions.logout}>
                    Submit Logout
                </button>
            )}

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
