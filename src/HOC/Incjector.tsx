import React from 'react';
import { useDIContainer } from '../context/DIContainerContext';

export function diInject<P>(Component: React.JSXElementConstructor<P>, dependencyName: string) {
    return function diInjectWrap() {
        const container = useDIContainer();
        const props = container.resolve(dependencyName);

        if (!props) {
            throw new Error(`${dependencyName} is not exist in DI container`);
        }

        return <Component {...props} />;
    };
}
