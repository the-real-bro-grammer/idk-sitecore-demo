export type GraphQlSearchResultsMetadata = {
  total: number;
  pageInfo: {
    endCursor: string;
    hasNext: boolean;
  };
};
