import { useContext } from 'react';
import { SearchContext } from './context';

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('Component must be set within a SearchProvider (SearchContainer)');
    }

    return context;
};
