import fs from "fs";
import axios from "axios";
import cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";
import { program } from "commander";
import SerpApi from "google-search-results-nodejs";

const categories = [
  "缶",
  "紙カートン",
  "ガラス",
  "ペットボトル",
  "プラスチック",
];

const serpApi = `${process.env.SERPAPI_KEY}`;
const search = new SerpApi.GoogleSearch(serpApi);

function validatePath(path) {
  if (!fs.existsSync(path)) {
    throw new Error("Path does nopt exist");
  }
  categories.forEach((category) => {
    const categoryDir = `${path}/images/${category}`;
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
  });
  return path;
}

async function downloadImg(path, url, category) {
  const ext = url.split(".").pop()?.split("?")[0];
  const imgName = `${uuidv4()}.${ext}`;
  const writer = fs.createWriteStream(`${path}/images/${category}/${imgName}`);

  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    await new Promise((resolve, reject) => {
      response.data.pipe(writer).on("finish", resolve).on("error", reject);
    });

    console.log(`Downloaded ${imgName}`);
  } catch (error) {
    console.log(`Error downloading ${url}`);
  }
}

async function scrapeImageUrls(query, numImages) {
  const urls = [];
  let page = 0;

  while (urls.length < numImages) {
    const params = {
      q: query,
      tbm: "isch",
      ijn: page.toString(),
      num: "20000",
      api_key: serpApi,
    };

    const result = await new Promise((resolve, reject) => {
      search.json(params, (data) => {
        if (data && data.images_results) {
          resolve(data.images_results.map((img) => img.original));
        } else {
          reject(new Error("No images found"));
        }
      });
    });

    urls.push(...result);

    if (resul.length === 0) break; // Stop if no more results
    page++;
  }
  return urls.slice(0, Number(numImages)); // Return only the required number of images
}

program
  .version("0.0.1")
  .description("Image Scraper with SerpApi")
  .argument("<path>")
  .action(async (path) => {
    validatePath(path);

    for (const category of categories) {
      const urls = await scrapeImageUrls(category, "20000");
      for (const url of urls) {
        await downloadImg(path, url, category);
      }
      console.log(`Downloaded ${urls.length} images for category ${category}`);
    }
  });

program.parse(process.argv);
