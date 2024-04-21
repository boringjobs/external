import { ParsePDF } from "../src/lib/ParsePDF";

describe("ParsePDF", () => {
  it("parses the content of a PDF file to a string", async () => {
    const pdfString = await ParsePDF("./test/sample.pdf");
    expect(pdfString).toBeDefined();
    expect(pdfString).toBe("\n\nTest PDF file");
  });

  it("throws an error when an invalid path is given", async () => {
    await expect(ParsePDF("badpath")).rejects.toThrow(
      "ENOENT: no such file or directory, open 'badpath'"
    );
  });
});
