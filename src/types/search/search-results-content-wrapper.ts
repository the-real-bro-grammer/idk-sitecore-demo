import { GraphQlSearchResponse } from '../graph-ql/search-response';
import { GraphQlSearchResultsMetadata } from '../graph-ql/search-results-metadata';

export class SearchResultsContentWrapper<T> {
  public metaData: GraphQlSearchResultsMetadata;
  public items: T[];

  constructor(results: GraphQlSearchResponse<T>) {
    this.metaData = { ...results.searchResults };
    this.items = results.searchResults?.results;
  }
}

export class SearchResultsWrapper<T> {
  public metaData: GraphQlSearchResultsMetadata;
  public items: T[];

  constructor(results: GraphQlSearchResponse<T>) {
    this.metaData = { ...results.searchResults };
    this.items = results.searchResults?.results?.map((r) => r as T);
  }
}
