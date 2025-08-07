import { createContext } from 'react';
import { ListingTag } from 'src/types/demo-2/listing-tag';

type ListingProviderContextType = null | {
  selectedTag: ListingTag;
  tags: { jsonValue: ListingTag[] };
  setSelectedTag: (tag: ListingTag) => void;
};

export const ListingContext = createContext<ListingProviderContextType>(null);
