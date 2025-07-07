import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

// Since we are in an ES module, __dirname is not available. We can create it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertSvgToPng(inputPath, outputDirectory, outputs) {
  try {
    const absoluteInputPath = path.resolve(__dirname, "..", inputPath);
    const absoluteOutputDirectory = path.resolve(__dirname, "..", outputDirectory);

    for (const output of outputs) {
      const { size, name } = output;
      const absoluteOutputPath = path.join(absoluteOutputDirectory, name);

      await sharp(absoluteInputPath)
        .resize(size, size)
        .png()
        .toFile(absoluteOutputPath);

      console.log(
        `Successfully converted ${inputPath} to ${absoluteOutputPath} at ${size}x${size}`,
      );
    }
  } catch (error) {
    console.error("An error occurred during image conversion:", error);
  }
}

const inputFile = process.argv[2];
const outputDirectory = process.argv[3];
const outputsJson = process.argv[4];

if (!inputFile || !outputDirectory || !outputsJson) {
  console.error(
    "Usage: node scripts/svg-to-png.js <input-svg-path> <output-directory> '<json-array-of-outputs>'",
  );
  console.error(
    `Example: node scripts/svg-to-png.js public/WA-Green.svg src-tauri/icons '[{"size": 128, "name": "128x128.png"}]'`,
  );
  process.exit(1);
}

try {
  const outputs = JSON.parse(outputsJson);
  convertSvgToPng(inputFile, outputDirectory, outputs);
} catch (error) {
  console.error(
    "Invalid JSON provided for output sizes. Make sure it's a valid JSON array and properly quoted.",
  );
  console.error(error);
  process.exit(1);
}
