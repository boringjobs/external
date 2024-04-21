# Resume PDF to Resume HTML

This NodeJS program converts a PDF resume into a styled, HTML website.

## Process

1. Convert PDF resume to text
2. Utilize OpenAI GPT to turn resume text into [JSON Resume format](https://jsonresume.org)
3. Render Twig template usings values from JSON resume
4. Send rendered HTML to OpenAI GPT to get CSS styles based on style preferences set by the user.
5. Render a second Twig template with the resume HTML and the CSS styles
6. Save HTML resume to filesystem

## Configuration

Following the `.env.sample` file, create a `.env` file in the root of the project. Set your OpenAI API key and the name of the model you prefer to use.

## Execution

You can run the program with the `start` script. Example usages:

`npm run start -- --resume ./sample-resume.pdf --output ./resume-output.html`

`npm run start -- --resume ./resume.pdf --themeStyle modern slick minimal professional`

### CLI arguments

---

| Argument   | Type          | Required | Summary                                                                    |
| ---------- | ------------- | -------- | -------------------------------------------------------------------------- |
| resume     | String        | Yes      | The input PDF file to use                                                  |
| output     | String        | No       | The output HTML file to generate                                           |
| themeStyle | Array<String> | No       | One or more words describing the desired visual styling of the HTML resume |
