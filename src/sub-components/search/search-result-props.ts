import { Result } from '@coveo/headless';

export type SearchResultProps = {
    result?: Result;
};

export const ExampleResults: Result = {
    title: 'Example Title',
    uri: '',
    printableUri: '',
    clickUri: '',
    uniqueId: '',
    excerpt: '',
    firstSentences: '',
    summary: null,
    flags: '',
    hasHtmlVersion: false,
    score: 0,
    percentScore: 0,
    rankingInfo: '',
    isTopResult: false,
    isRecommendation: false,
    titleHighlights: [],
    firstSentencesHighlights: [],
    excerptHighlights: [],
    printableUriHighlights: [],
    summaryHighlights: [],
    absentTerms: [],
    raw: {
        urihash: '',
    },
    isUserActionView: false,
    searchUid: '',
};
