import "dotenv/config";
import { ParsePDF } from "./lib/ParsePDF";
import {
  GetCSSStylingForHTMLResume,
  ResumeStringToJSONResume,
} from "./lib/GPTProcessor";
import { RenderTemplate } from "./lib/TemplateRenderer";
import * as fs from "node:fs/promises";

ParsePDF(__dirname + "/../test/sample.pdf").then(async (resumeText) => {
  const jsonResume = await ResumeStringToJSONResume(resumeText);
  // let resumeString = await fs.readFile(
  //   __dirname + "/../test/sample.json",
  //   "utf-8"
  // );

  // const jsonResume = JSON.parse(resumeString);

  try {
    const htmlResumeContent = await RenderTemplate(
      __dirname + "/templates/basic/basic.twig",
      {
        resume: jsonResume,
      }
    );

    const themeKeywords = [
      "minimal",
      "clean",
      "modern",
      "simple",
      "professional",
    ];

    const cssStyling = await GetCSSStylingForHTMLResume(
      themeKeywords,
      htmlResumeContent
    );

    const htmlResumeDocument = await RenderTemplate(
      __dirname + "/templates/master_layout.twig",
      {
        css: cssStyling,
        content: htmlResumeContent,
        title: jsonResume?.basic?.name || "Resume",
      }
    );

    await fs.writeFile(
      __dirname + "/../resume.json",
      JSON.stringify(jsonResume)
    );

    await fs.writeFile(
      __dirname + "/../resume.html",
      htmlResumeDocument as string
    );
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);
  }
});
