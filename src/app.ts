import "dotenv/config";
import { ParsePDF } from "./lib/ParsePDF";
import {
  GetCSSStylingForHTMLResume,
  ResumeStringToJSONResume,
} from "./lib/GPTProcessor";
import { RenderTemplate } from "./lib/TemplateRenderer";
import * as fs from "node:fs/promises";
import * as commandLineArgs from "command-line-args";

const optionDefinitions: Array<commandLineArgs.OptionDefinition> = [
  { name: "resume", alias: "r", type: String },
  { name: "output", type: String, alias: "o", defaultValue: "output.html" },
  {
    name: "themeStyle",
    alias: "t",
    type: String,
    multiple: true,
    defaultValue: ["clean", "modern", "professional", "impressive", "sleek"],
  },
];

const options = commandLineArgs(optionDefinitions);

if (!options.resume) {
  throw new Error("A resume path must be provided.");
}

const themeKeywords = options.themeStyle;

ParsePDF(options.resume).then(async (resumeText) => {
  const jsonResume = await ResumeStringToJSONResume(resumeText);

  try {
    const htmlResumeContent = await RenderTemplate(
      __dirname + "/templates/basic/basic.twig",
      {
        resume: jsonResume,
      }
    );

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

    await fs.writeFile(options.output, htmlResumeDocument as string);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);
  }
});
