import { ItemListingProvider, useCurrentListing } from '@contexts/item-listing-context';
import { Field, Image, Item, Placeholder, Text } from '@sitecore-jss/sitecore-jss-react';
import { searchItemListing } from 'lib/api/item-listing/item-listing-search';
import { ComponentProps } from 'lib/component-props';
import { JSX, useEffect, useState } from 'react';
import { ListingTag } from 'src/types/demo-2/listing-tag';
import { Product } from 'src/types/demo-2/product';
import { SearchResultsContentWrapper } from 'src/types/search/search-results-content-wrapper';
import { WrappedField } from 'src/types/wrapped-field';

// Define the shape of the fields expected from Sitecore for the listing component
interface Fields {
  data: {
    datasource: {
      title: WrappedField<string>;
      pageSize: Field<number>;
      tags: { jsonValue: ListingTag[] };
      startSearchLocation: Item;
    };
  };
}

// Props type for the TaggedItemListing component including datasource fields and rendering params
type TaggedItemListingProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

// Component responsible for fetching and displaying items filtered by the selected tag
const ListingItems = (props: TaggedItemListingProps) => {
  const { selectedTag } = useCurrentListing();
  const [listingItems, setListingItems] = useState<Product[]>([]);

  // Fetch listing items when the selected tag changes
  useEffect(() => {
    if (selectedTag && selectedTag.id) {
      searchItemListing({
        pageSize: props.fields.data.datasource.pageSize.value,
        startSearchLocation: props.fields.data.datasource.startSearchLocation.id,
        tag: selectedTag.id,
      })
        .then((resultsWrapper: SearchResultsContentWrapper<Product>) => {
          setListingItems(resultsWrapper.items);
        })
        .catch((error) => {
          console.error('An error ocurred when getting listing items', error);
        });
    }
  }, [selectedTag]);

  // Render the component's HTML structure including placeholders and fetched items
  return (
    <div className="item-listing__items container d-flex">
      {listingItems &&
        listingItems.map((item, index) => {
          // Render the component's HTML structure including placeholders and fetched items
          return (
            <div key={index} className="item-listing__listing-item col-4">
              <div className="flex-row">
                <Image field={item.image?.jsonValue} />
              </div>
              <div className="flex-row">
                <Text field={item.productName?.jsonValue} />
              </div>
              <div className="flex-row">
                <Text tag="strong" field={item.price?.jsonValue} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

// Default export for the TaggedItemListing component, wrapped in a context provider
const Default = (props: TaggedItemListingProps): JSX.Element => {
  const styles = `component item-listing ${props.params?.styles}`.trimEnd();
  const id = props.rendering.uid;
  const navPhKey = `item-listing-navigation-${props?.params?.DynamicPlaceholderId}`;

  // Render the component's HTML structure including placeholders and fetched items
  return (
    <ItemListingProvider tags={props.fields.data.datasource.tags}>
      <section className={styles} id={id ? id : undefined}>
        <Text
          className="item-listing__heading"
          tag="h2"
          field={props.fields.data.datasource.title?.jsonValue}
        />
        <div className="item-listing__nav">
          <Placeholder
            name={navPhKey}
            rendering={props.rendering}
            key={props?.params?.DynamicPlaceholderId}
          />
        </div>
        <ListingItems {...props} key={props?.params?.DynamicPlaceholderId} />
      </section>
    </ItemListingProvider>
  );
};

export { Default };
