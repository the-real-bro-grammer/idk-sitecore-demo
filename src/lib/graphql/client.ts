import graphqlClientFactory from 'lib/graphql-client-factory';
import { GraphQlSearchResponse } from 'src/types/graph-ql/search-response';
import { SearchRequest } from 'src/types/search/search-request';
import { SearchResultsWrapper } from 'src/types/search/search-results-content-wrapper';
import { itemListingSearchQuery, wildcardPageQuery } from './Generated';

type WildcardSearchResults = {
  name: string;
  url: {
    path: string;
  };
};

export class GraphQLClient {
  private static graphQlClient = graphqlClientFactory();

  public static GetItemListingResults = async (searchRequest: SearchRequest) => {
    const startSearchLocation = (
      searchRequest.startSearchLocation ?? '11111111-1111-1111-1111-111111111111'
    ).replaceAll('-', '');
    const tag = searchRequest.tag.replaceAll('-', '');

    console.log(startSearchLocation, tag);

    const response = await GraphQLClient.graphQlClient.request(itemListingSearchQuery, {
      startSearchLocation,
      tag,
      pageSize: searchRequest.pageSize,
    });

    return response;
  };

  public static GetWildcardPage = async (
    bucketId: string,
    itemName: string
  ): Promise<SearchResultsWrapper<WildcardSearchResults> | null> => {
    if (!itemName || itemName.length <= 0) {
      return null;
    }

    const response = (await GraphQLClient.graphQlClient.request(wildcardPageQuery, {
      bucketId,
      itemName,
    })) as GraphQlSearchResponse<WildcardSearchResults>;

    return new SearchResultsWrapper(response);
  };
}
