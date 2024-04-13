import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import * as resumeToJsonPrompt from "../prompts/resume_to_json.json";
import * as exampleJsonResume from "../prompts/example_json_resume.json";

const openAI = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const ResumeStringToJSONResume = async (resume: string) => {
  const systemRole: ChatCompletionMessageParam = {
    role: "system",
    content: resumeToJsonPrompt.system + `\n${exampleJsonResume}`,
  };

  const userRole: ChatCompletionMessageParam = {
    role: "user",
    content: resumeToJsonPrompt.user + `\n${resume}`,
  };

  const chatCompletion = await openAI.chat.completions.create({
    messages: [systemRole, userRole],
    model: process.env.OPEN_AI_MODEL ?? "gpt-3.5-turbo",
  });

  return JSON.parse(chatCompletion.choices[0].message.content ?? "{}");
};
