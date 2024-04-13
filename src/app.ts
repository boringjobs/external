import "dotenv/config";
import { ParsePDF } from "./lib/ParsePDF";
import { ResumeStringToJSONResume } from "./lib/GPTProcessor";
import { RenderTemplate } from "./lib/TemplateRenderer";
import * as fs from "node:fs/promises";

ParsePDF(__dirname + "/../test/sample.pdf").then(async (resumeText) => {
  const jsonResume = await ResumeStringToJSONResume(resumeText);

  try {
    const htmlResume = await RenderTemplate(
      __dirname + "/templates/basic.twig",
      {
        resume: jsonResume,
      }
    );

    await fs.writeFile(
      __dirname + "/../resume.json",
      JSON.stringify(jsonResume)
    );
    await fs.writeFile(__dirname + "/../resume.html", htmlResume as string);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);
  }
});
