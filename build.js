import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory containing the examples
const examplesDir = path.join(__dirname, "examples");

// Function to generate the HTML file
function generateHTML() {
  let links = "";

  try {
    // Read the directory for folder names
    const items = fs.readdirSync(examplesDir, { withFileTypes: true });

    // Filter for directories and create links
    items.forEach((item) => {
      if (item.isDirectory()) {
        const formattedName = item.name
          .replace(/^(\d{2})-(\d{2})-/, "$1 $2: ")
          .replace(/-/g, " ");
        links += `    <a href="./examples/${item.name}/">${formattedName}</a>\n`;
      }
    });
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  // Construct the HTML content
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>D3 Examples</title>
  </head>
  <body>
${links}  </body>
</html>`;

  // Write the HTML to a file
  try {
    fs.writeFileSync("index.html", html, "utf-8");
    console.log("HTML file generated successfully.");
  } catch (err) {
    console.error(`Error writing HTML file: ${err.message}`);
  }
}

// Execute the function
generateHTML();
