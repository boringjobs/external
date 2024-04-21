import { setShouldFail } from "../__mocks__/twig";
import { RenderTemplate } from "../src/lib/TemplateRenderer";

describe("RenderTemplate", () => {
  it("resolves to the rendered template", async () => {
    const result = await RenderTemplate("samplepath", { a: "val1", b: "val2" });
    expect(result).toEqual("<html>samplepathval1val2</html>");
  });
  it("rejects promise when twig rendering fails", async () => {
    setShouldFail(true);
    await expect(RenderTemplate("a", {})).rejects.toThrow("Error");
  });
});
