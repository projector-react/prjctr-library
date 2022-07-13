import { FC } from 'react';
import { Credentials } from './library';
import { Observable } from 'rxjs';
import { useObservableState } from 'observable-hooks';

export type LibraryViewProps = {
    isAuthenticated$: Observable<boolean>;
    onLogin: (credentials: Credentials) => void;
    onLogout: () => void;
};

export const LibraryView: FC<LibraryViewProps> = ({ isAuthenticated$, onLogin, onLogout }) => {
    const isAuthenticated = useObservableState(isAuthenticated$, false);

    const mockUser = {
        username: 'projector_user',
        password: 'projector'
    };

    return (
        <>
            <h1>Library</h1>

            <h2>isAuthenticated:{isAuthenticated ? 'true' : 'false'}</h2>

            {!isAuthenticated ? (
                <button type="button" onClick={() => onLogin(mockUser)}>
                    Submit Login
                </button>
            ) : (
                <button type="button" onClick={onLogout}>
                    Submit Logout
                </button>
            )}

            {/*<ul>*/}
            {/*    <li>*/}
            {/*        <button type="button" onClick={() => navigate(getPath(RouteName.LOGIN))}>*/}
            {/*            Login*/}
            {/*        </button>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <button type="button" onClick={() => navigate(getPath(RouteName.REGISTRATION))}>*/}
            {/*            Register*/}
            {/*        </button>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            onClick={() => navigate(`${getPath(RouteName.VIDEO)}/name`)}*/}
            {/*        >*/}
            {/*            Video*/}
            {/*        </button>*/}
            {/*    </li>*/}
            {/*</ul>*/}
        </>
    );
};
