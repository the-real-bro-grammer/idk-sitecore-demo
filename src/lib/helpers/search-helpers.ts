import { SearchResultProps } from 'src/sub-components/search/search-result-props';

export type SearchResult = {
  title: string;
  thumbnailImageUrl?: string;
};

export const searchFields: string[] = ['clickableuri'];

export const buildSearchResult = (props: SearchResultProps): SearchResult | null => {
  if (!props.result) {
    return null;
  }

  const searchResult: SearchResult = {
    title: props.result.title,
  };

  if (props.result.raw['thumbnail_image_url']) {
    searchResult.thumbnailImageUrl = props.result.raw['thumbnail_image_url'] as string;
  }

  return searchResult;
};
