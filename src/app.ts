import { PDFToString } from "./lib/ParsePDF";

PDFToString(__dirname + "/../test/sample.pdf").then((data) =>
  console.log(data)
);
