import { buildSearchResult } from 'lib/helpers/search-helpers';
import { SearchResultProps } from './search-result-props';

export default (props: SearchResultProps) => {
  const searchResult = buildSearchResult(props);

  return (
    searchResult && (
      <div className="search-result default-search-result">
        <div className="container">
          <div className="row">
            <img
              className="search-result__image"
              src={searchResult.thumbnailImageUrl}
              alt={searchResult.title}
            />
          </div>
          <div className="row">
            <h4 className="search-result__title">{searchResult.title}</h4>
          </div>
        </div>
      </div>
    )
  );
};
