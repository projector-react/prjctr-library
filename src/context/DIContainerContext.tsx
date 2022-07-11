import { createContext, FC, ReactNode, useContext } from 'react';
import { container } from '../composition-root';

const DIContainerContext = createContext(container);

type DIContainerProviderType = {
    children: ReactNode;
};

export const DIContainerProvider: FC<DIContainerProviderType> = ({ children }) => {
    return <DIContainerContext.Provider value={container}>{children}</DIContainerContext.Provider>;
};

export const useDIContainer = () => useContext(DIContainerContext);
