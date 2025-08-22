export const automaticSearchFilterQuery = `fragment ItemDetails on Item {
  title: field(name: "Title") {
    value
  }
  facet: field(name: "Facet") {
    jsonValue
  }
}

query PageContextQuery($datasource: String!, $language: String!) {
  datasource: item(path: $datasource, language: $language) {
    ...ItemDetails
  }
}
`;  
    export const itemListingSearchQuery = `fragment ItemDetails on Item {
  id
  productName: field(name: "Product Name") {
    jsonValue
  }
  price: field(name: "Price") {
    jsonValue
  }
  image: field(name: "Image") {
    jsonValue
  }
}

query ItemListingSearch($startSearchLocation: String!, $tag: String!, $pageSize: Int!) {
  searchResults: search(
    where: {
      AND: [
        { name: "_path", value: $startSearchLocation, operator: CONTAINS }
        { name: "sxatags_sm", value: $tag, operator: CONTAINS }
      ]
    }
    first: $pageSize
  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
    results {
      ...ItemDetails
    }
  }
}
`;  
    export const manualSearchFilterQuery = `fragment ItemDetails on Item {
  title: field(name: "Title") {
    value
  }
  facet: field(name: "Facet") {
    jsonValue
  }
  matchAll: field(name: "Match All") {
    value
  }
}

query PageContextQuery($datasource: String!, $language: String!) {
  datasource: item(path: $datasource, language: $language) {
    ...ItemDetails
  }
}
`;  
    export const searchResultsQuery = ``;  
    export const wildcardPageQuery = `query ItemResolveQuery($bucketId: String!, $itemName: String!) {
    searchResults: search(
        where: {
            AND: [
                { name: "_path", value: $bucketId, operator: CONTAINS }
                { name: "_name", value: $itemName, operator: EQ }
            ]
        }
    ) {
        results {
            name
            url {
                path
            }
        }
    }
}
`;  
    