import * as Twig from "twig";

export const RenderTemplate = (
  templatePath: string,
  data: Object
): Promise<string> => {
  return new Promise((resolve, reject) => {
    Twig.renderFile(templatePath, data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
