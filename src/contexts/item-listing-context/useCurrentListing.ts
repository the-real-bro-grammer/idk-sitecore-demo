import { useContext } from 'react';
import { ListingContext } from './context';

export const useCurrentListing = () => {
    const context = useContext(ListingContext);
    if (!context) {
        throw new Error('useCurrentListing must be used within a TagProvider');
    }

    return context;
};
