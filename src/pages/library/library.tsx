import { FC, useContext } from 'react';
import { RouteName, RouterContext } from '../../Router';

export const Library: FC = () => {
    const { navigate } = useContext(RouterContext);

    return (
        <>
            <h1>Library</h1>

            <ul>
                <li>
                    <button type="button" onClick={() => navigate(RouteName.LOGIN)}>
                        Login
                    </button>
                </li>
                <li>
                    <button type="button" onClick={() => navigate(RouteName.REGISTRATION)}>
                        Register
                    </button>
                </li>
                <li>
                    <button type="button" onClick={() => navigate(`${RouteName.VIDEO}/name`)}>
                        Video
                    </button>
                </li>
            </ul>
        </>
    );
};
