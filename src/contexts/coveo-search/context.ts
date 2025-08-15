import { Result, SearchEngine } from '@coveo/headless';
import { createContext, JSX } from 'react';

type SearchContextType = null | {
  engine: SearchEngine;
  fieldsToInclude: string[];
  ResultTemplate?: (props: { result?: Result }) => JSX.Element;
};

export const SearchContext = createContext<SearchContextType>(null);
