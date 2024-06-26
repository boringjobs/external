import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import * as resumeToJsonPrompt from "../prompts/prompt_resume_to_json.json";
import * as styleHtmlResumePrompt from "../prompts/prompt_style_html_resume.json";

import * as exampleResumeA from "../prompts/example_resume_a.json";
import * as exampleResumeB from "../prompts/example_resume_b.json";
import * as exampleResumeC from "../prompts/example_resume_c.json";
import * as exampleResumeD from "../prompts/example_resume_d.json";

import * as exampleResumeJsonA from "../prompts/example_resume_json_a.json";
import * as exampleResumeJsonB from "../prompts/example_resume_json_b.json";
import * as exampleResumeJsonC from "../prompts/example_resume_json_c.json";
import * as exampleResumeJsonD from "../prompts/example_resume_json_d.json";

import * as exampleWebsiteA from "../prompts/example_website_a.json";

import * as exampleCSSA from "../prompts/example_css_a.json";
import * as exampleCSSB from "../prompts/example_css_a.json";

import * as json_resume_format from "../prompts/example_json_resume_format.json";

const openAI = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const ResumeStringToJSONResume = async (resume: string) => {
  const systemRole: ChatCompletionMessageParam = {
    role: "system",
    content:
      resumeToJsonPrompt.system + "\n" + JSON.stringify(json_resume_format),
  };

  const exampleRoleA: ChatCompletionMessageParam = {
    role: "system",
    content:
      "The following is an example resume input:\n" +
      exampleResumeA.content +
      "\nThe following is the expected JSON resume output:\n" +
      JSON.stringify(exampleResumeJsonA),
  };

  const exampleRoleB: ChatCompletionMessageParam = {
    role: "system",
    content:
      "The following is an example resume input:\n" +
      exampleResumeB.content +
      "\nThe following is the expected JSON resume output:\n" +
      JSON.stringify(exampleResumeJsonB),
  };

  const exampleRoleC: ChatCompletionMessageParam = {
    role: "system",
    content:
      "The following is an example resume input:\n" +
      exampleResumeC.content +
      "\nThe following is the expected JSON resume output:\n" +
      JSON.stringify(exampleResumeJsonC),
  };

  const exampleRoleD: ChatCompletionMessageParam = {
    role: "system",
    content:
      "The following is an example resume input:\n" +
      exampleResumeD.content +
      "\nThe following is the expected JSON resume output:\n" +
      JSON.stringify(exampleResumeJsonD),
  };

  const userRole: ChatCompletionMessageParam = {
    role: "user",
    content: resumeToJsonPrompt.user + `\n${resume}`,
  };

  const chatCompletion = await openAI.chat.completions.create({
    messages: [
      systemRole,
      exampleRoleA,
      exampleRoleB,
      exampleRoleC,
      exampleRoleD,
      userRole,
    ],
    model: process.env.OPEN_AI_MODEL ?? "gpt-3.5-turbo",
  });

  if (!chatCompletion?.choices?.length) return {};
  try {
    const json = JSON.parse(
      chatCompletion?.choices[0]?.message?.content ?? "{}"
    );

    return json;
  } catch (e) {
    return {};
  }
};

export const GetCSSStylingForHTMLResume = async (
  themeKeywords: Array<string>,
  html: string
) => {
  const styleHtmlResumeUserPrompt = styleHtmlResumePrompt.user.replace(
    "{THEME_KEYWORDS}",
    themeKeywords.join(", ")
  );

  const systemRole: ChatCompletionMessageParam = {
    role: "system",
    content: styleHtmlResumePrompt.system,
  };

  const exampleRoleA: ChatCompletionMessageParam = {
    role: "system",
    content:
      "The following is an example html resume input:\n" +
      exampleWebsiteA.content +
      "The following is an example of a CSS output:\n" +
      exampleCSSA.content,
  };

  const exampleRoleB: ChatCompletionMessageParam = {
    role: "system",
    content:
      "The following is an example html resume input:\n" +
      exampleWebsiteA.content +
      "The following is an example of a CSS output:\n" +
      exampleCSSB.content,
  };

  const userRole: ChatCompletionMessageParam = {
    role: "user",
    content: styleHtmlResumeUserPrompt + `\n${html}`,
  };

  const chatCompletion = await openAI.chat.completions.create({
    messages: [systemRole, exampleRoleA, exampleRoleB, userRole],
    model: process.env.OPEN_AI_MODEL ?? "gpt-3.5-turbo",
  });

  if (!chatCompletion?.choices?.length) return "";
  else return chatCompletion?.choices[0]?.message?.content ?? "";
};
