import { GraphQLClient } from 'lib/graphql/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { SearchRequest } from 'src/types/search/search-request';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const requestBody: SearchRequest = {
      ...req.body,
    };

    if (!requestBody) {
      res.status(400).end();
      return;
    }

    const queryResult = await GraphQLClient.GetItemListingResults(requestBody);

    res.status(200).json(queryResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
