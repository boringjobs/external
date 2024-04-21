let resultFails = false;

export const setShouldFail = (shouldFail: boolean) => {
  resultFails = shouldFail;
};

export const renderFile = (
  path: string,
  data: object,
  callback: (error?: Error, result?: string) => {}
) => {
  if (resultFails) callback(new Error("Error"), undefined);
  else
    callback(undefined, `<html>${path}${Object.values(data).join("")}</html>`);
};
