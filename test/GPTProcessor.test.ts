import { setShouldFail } from "../__mocks__/openai";
import {
  ResumeStringToJSONResume,
  GetCSSStylingForHTMLResume,
} from "../src/lib/GPTProcessor";
import * as resumeToJsonPrompt from "../src/prompts/resume_to_json.json";
import * as styleHtmlResumePrompt from "../src/prompts/style_html_resume.json";

describe("ResumeStringToJSONResume", () => {
  it("calls the openai library with the correct information", async () => {
    const result = await ResumeStringToJSONResume("jest sample resume");
    expect(result.messages.length).toBe(2);
    expect(result.model).toBe("gpt-3.5-turbo");

    expect(result.messages[0].content).toContain(resumeToJsonPrompt.system);
    expect(result.messages[1].content).toContain("jest sample resume");
  });

  it("returns an empty object if chat completions fail", async () => {
    setShouldFail(true);
    const result = await ResumeStringToJSONResume("jest sample resume");
    expect(result).toEqual({});
  });
});

describe("GetCSSStylingForHTMLResume", () => {
  it("calls the openai library with the correct information", async () => {
    const result = await GetCSSStylingForHTMLResume(
      ["jeststyle1", "jeststyle2"],
      "jest sample html"
    );
    expect(result).toContain("gpt-3.5-turbo");

    expect(result).toContain(styleHtmlResumePrompt.system);
    expect(result).toContain("jeststyle1, jeststyle2");
    expect(result).toContain("jest sample html");
  });

  it("returns an empty string if chat completions fail", async () => {
    setShouldFail(true);
    const result = await await GetCSSStylingForHTMLResume(
      ["jeststyle1", "jeststyle2"],
      "jest sample html"
    );
    expect(result).toEqual("");
  });
});
