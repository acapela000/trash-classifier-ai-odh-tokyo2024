// import fs from "fs";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import { program } from "commander";

// const categories = [
//   "缶",
//   "紙カートン",
//   "ガラス",
//   "ペットボトル",
//   "プラスチック",
// ];

// // Validate path and create directories
// function validatePath(path) {
//   if (!fs.existsSync(path)) {
//     throw new Error("Path does not exist");
//   }
//   categories.forEach((category) => {
//     if (!fs.existsSync(`${path}/images/${category}`)) {
//       fs.mkdirSync(`${path}/images/${category}`, { recursive: true });
//     }
//   });
//   return path;
// }

// // Download 20000 images from URL
// async function downloadImage(path, url, category) {
//   const ext = url.split(".").pop();
//   const imgName = `${uuidv4()}.${ext}`;
//   const writer = fs.createWriteStream(`${path}/images/${category}/${imgName}`);
//   try {
//     const response = await axios({
//       url,
//       method: "GET",
//       responseType: "stream",
//     });

//     await new Promise((resolve, reject) => {
//       response.data.pipe(writer).on("finish", resolve).on("error", reject);
//     });

//     console.log(`Image downloaded successfully from ${url}`);
//   } catch (error) {
//     console.error(`Failed to download image at url ${url}: ${error}`);
//   }
// }

// // const imgName = uuidv4();
// // const imgType = url.split(".").pop();
// // const res = await axios.get(url, { responseType: "arraybuffer" });
// // fs.writeFileSync(`${path}/images/${category}/${imgName}.${imgType}`, res.data);

// async function scrapping(query) {
//   const url = `https://www.google.com/search?q=${query}&tbm=isch`;
//   const res = await axios.get(url);
//   const html = res.data;
//   const urls = html.match(/https:\/\/[^"]+gstatic.com[^"]+/g);
//   return urls;
// }

// // Main execute the program
// program
//   .version("1.0.0")
//   .description("My scrapper")
//   .argument("<path>")
//   .action(async (path) => {
//     validatePath(path);

//     for (const category of categories) {
//       const urls = await scrapping(category);
//       urls.forEach((url) => {
//         downloadImage(path, url, category);
//       });
//     }
//   });

// program.parse(process.argv);
