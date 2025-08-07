import graphqlClientFactory from 'lib/graphql-client-factory';
import { SearchRequest } from 'src/types/search/search-request';
import { itemListingSearchQuery } from './Generated';

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
}
