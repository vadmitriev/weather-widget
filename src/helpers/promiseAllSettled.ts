export const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === 'rejected';

export const isFullfilled = <T>(
  input: PromiseSettledResult<T>,
): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';
