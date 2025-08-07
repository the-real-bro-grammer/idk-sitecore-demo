import { SearchRequest } from 'src/types/search/search-request';
import { SearchResultsContentWrapper } from 'src/types/search/search-results-content-wrapper';
import instance, { basePath } from '../axios-instance';

const itemListingPath = `${basePath}/demo-2/item-listing`;

export const searchItemListing = async <T>(
  request: SearchRequest
): Promise<SearchResultsContentWrapper<T>> => {
  const response = await instance.post(`${itemListingPath}`, request);
  const results = new SearchResultsContentWrapper<T>(response.data);
  return results;
};
