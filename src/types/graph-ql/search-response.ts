import { GraphQlSearchResultsMetadata } from './search-results-metadata';

export type GraphQlSearchResponse<TResults> = {
  searchResults: GraphQlSearchResultsMetadata & {
    results: TResults[];
  };
};
