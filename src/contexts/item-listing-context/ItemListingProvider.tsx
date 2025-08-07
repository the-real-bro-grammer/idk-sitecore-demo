import { useState } from 'react';
import { ListingTag } from 'src/types/demo-2/listing-tag';
import { ListingContext } from './context';

type ListingProviderType = {
  tags: { jsonValue: ListingTag[] };
  children: React.ReactNode;
};

export const ItemListingProvider = ({ children, tags }: ListingProviderType) => {
  const [selectedTag, setSelectedTag] = useState<ListingTag>(tags.jsonValue[0]);

  return (
    <ListingContext.Provider
      value={{
        selectedTag: selectedTag,
        setSelectedTag: setSelectedTag,
        tags,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
