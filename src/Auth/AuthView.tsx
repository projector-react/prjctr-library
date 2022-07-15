import { FC, ReactNode, useEffect } from 'react';

export type AuthViewProps = {
    children: ReactNode;
    refreshToken: () => void;
};

export const AuthView: FC<AuthViewProps> = ({ children, refreshToken }) => {
    useEffect(() => {
        refreshToken();
    }, []);

    return <>{children}</>;
};
