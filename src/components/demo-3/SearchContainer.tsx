import { SearchProvider } from '@contexts/coveo-search';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import { JSX } from 'react';
import { SearchResultProps } from 'src/sub-components/search/search-result-props';

type SearchContainerProps = ComponentProps & {
  searchPipeline?: string;
  searchHub?: string;
  fieldsToInclude?: string[];
  ResultTemplate: (props: SearchResultProps) => JSX.Element;
};

const Default = (props: SearchContainerProps) => {
  const { t } = useI18n();
  const containerStyles = `component search-container w-100 my-3 ${
    props?.params?.Styles ?? ''
  }`.trimEnd();
  const id = props?.params?.RenderingIdentifier;

  const filterPhKey = `search-container-filter-${props?.params?.DynamicPlaceholderId}`;
  const mainPhKey = `search-container-main-${props?.params?.DynamicPlaceholderId}`;

  let filtersTitle = t('filters');
  if (!filtersTitle.length) {
    filtersTitle = 'Filters';
  }

  return (
    <SearchProvider
      searchHub={props.searchHub}
      searchPipeline={props.searchPipeline}
      ResultTemplate={props.ResultTemplate}
      fieldsToInclude={props.fieldsToInclude}
      className={containerStyles}
      id={id}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <h3>{filtersTitle}</h3>
          </div>
          <div className="col-lg-8"></div>
        </div>
        <div className="row">
          <div className="col-lg-2 search-container__filters">
            <div className="container">
              <Placeholder name={filterPhKey} rendering={props.rendering} />
            </div>
          </div>
          <div className="col-lg-8 search-container__main">
            <div className="container">
              <Placeholder name={mainPhKey} rendering={props.rendering} />
            </div>
          </div>
        </div>
      </div>
    </SearchProvider>
  );
};

export { Default };
