import { PDFToString } from "../src/lib/ParsePDF";

it("parses the content of a PDF file to a string", async () => {
  const pdfString = await PDFToString("./test/sample.pdf");
  expect(pdfString).toBeDefined();
  expect(pdfString.text).toBe("\n\nTest PDF file");
});

it("throws an error when an invalid path is given", async () => {
  await expect(PDFToString("badpath")).rejects.toThrow(
    "ENOENT: no such file or directory, open 'badpath'"
  );
});
