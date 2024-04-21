let resultFails = false;

export const setShouldFail = (shouldFail: boolean) => {
  resultFails = shouldFail;
};

export default class OpenAI {
  key = "";

  chat = {
    completions: {
      create: async (paramsObject: object) => {
        return new Promise((resolve, reject) =>
          resolve(
            resultFails
              ? ""
              : {
                  choices: [
                    {
                      message: {
                        content: JSON.stringify(paramsObject),
                      },
                    },
                  ],
                }
          )
        );
      },
    },
  };

  constructor(key: string) {
    this.key = key;
  }
}
