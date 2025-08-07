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
    