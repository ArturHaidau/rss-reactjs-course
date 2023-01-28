export const mockResolvedFetchWith = (data: unknown) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;
};

export const mockRejectedFetchWith = (error: Error) => {
  global.fetch = jest.fn(() => Promise.reject(error)) as jest.Mock;
};
