import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputFolders = ["src/assets/photographers/", "src/assets/media/"];
const baseOutputFolder = "src/assets/Sharp/";
const scaleFactor = 6;

inputFolders.forEach((inputFolder) => {
  const outputFolder = path.join(baseOutputFolder, path.basename(inputFolder));
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error("Error reading input folder:", err);
      return;
    }

    files.forEach((file) => {
      const inputPath = path.join(inputFolder, file);
      const outputPath = path.join(outputFolder, file);
      const image = sharp(inputPath);

      image
        .metadata()
        .then((metadata) => {
          return image
            .resize(Math.round(metadata.width / scaleFactor))
            .toFile(outputPath)
            .then(() => {
              console.log(
                `Image ${file} resized to about 1/${scaleFactor} of its original size and saved to ${outputPath}`
              );
            })
            .catch((err) => {
              console.error("Error resizing and saving file", file, err);
            });
        })
        .catch((err) => {
          console.error("Error processing file", file, err);
        });
    });
  });
});
