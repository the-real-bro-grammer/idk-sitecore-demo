import { useCurrentListing } from '@contexts/item-listing-context';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';

type BasicListingNavigationProps = ComponentProps & {};

const Default = (props: BasicListingNavigationProps): JSX.Element => {
  const styles = `component item-listing-nav ${props.params?.styles}`.trimEnd();
  const { selectedTag, tags, setSelectedTag } = useCurrentListing();

  return (
    <div className={styles}>
      <div className="item-listing-nav__group">
        {tags.jsonValue.map((tag, i) => (
          <button
            key={i}
            className={`item-listing-nav__pill ${selectedTag.id == tag.id ? 'active' : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag.displayName}
          </button>
        ))}
      </div>
    </div>
  );
};

export { Default };
