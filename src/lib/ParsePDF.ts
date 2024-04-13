import * as fs from "node:fs/promises";
import * as pdf from "pdf-parse";

export const ParsePDF = async (filepath: string) => {
  try {
    const file = await fs.readFile(filepath);

    return new Promise<string>((res, rej) => {
      pdf(file)
        .then((data: pdf.Result) => {
          res(data.text);
        })
        .catch((error: Error) => {
          rej(error);
        });
    });
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error("Invalid filepath provided.");
    }
    throw error;
  }
};
