import { buildSearchEngine, SearchEngine, SearchEngineOptions } from '@coveo/headless';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { getSearchToken } from 'lib/api/search/coveo';
import { searchFields } from 'lib/helpers/search-helpers';
import { JSX, useEffect, useState } from 'react';
import { SearchResultProps } from 'src/sub-components/search/search-result-props';
import { SearchContext } from './context';

type SearchProviderType = {
  className?: string;
  id?: string;
  searchPipeline?: string;
  searchHub?: string;
  fieldsToInclude?: string[];
  ResultTemplate?: (props: SearchResultProps) => JSX.Element;
  children: React.ReactNode;
};

export const SearchProvider = ({
  searchPipeline,
  searchHub,
  fieldsToInclude,
  ResultTemplate,
  className,
  id,
  children,
}: SearchProviderType) => {
  const [engine, setEngine] = useState<SearchEngine | null>(null);
  const { sitecoreContext } = useSitecoreContext();

  searchPipeline = searchPipeline ?? process.env.NEXT_PUBLIC_COVEO_DEFAULT_PIPELINE;
  searchHub = searchHub ?? process.env.NEXT_PUBLIC_COVEO_DEFAULT_HUB;
  fieldsToInclude = fieldsToInclude ?? searchFields;

  useEffect(() => {
    const initEngine = async () => {
      const config: SearchEngineOptions = {
        configuration: {
          organizationId: process.env.NEXT_PUBLIC_COVEO_ORG_ID as string,
          accessToken: await getSearchToken(),
          search: {
            pipeline: searchPipeline,
            searchHub: searchHub,
          },
        },
        loggerOptions: {
          level: 'debug',
        },
      };

      const headlessEngine = buildSearchEngine(config);
      setEngine(headlessEngine);
    };

    if (!sitecoreContext.pageEditing) {
      initEngine();
    }
  }, []);

  return (
    engine && (
      <SearchContext.Provider value={{ engine, ResultTemplate, fieldsToInclude }}>
        <div className={className} id={id}>
          {children}
        </div>
      </SearchContext.Provider>
    )
  );
};
