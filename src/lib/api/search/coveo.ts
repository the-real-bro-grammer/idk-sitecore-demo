export const getSearchToken = async (): Promise<string> => {
  return Promise.resolve<string>(process.env.NEXT_PUBLIC_COVEO_API_KEY as string);
};
