import fs from "fs";
import axios from "axios";
import cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";
import { program } from "commander";
import SerpApi from "google-search-results-nodejs";

// const categories = [
//   "缶",
//   "紙カートン",
//   "ガラス",
//   "ペットボトル",
//   "プラスチック",
// "プラスチック製品",
//   "プラスチック廃棄物",
//   "プラスチック袋",
//   "プラスチックボトル",
//   "プラスチック破片",
//   "プラスチック包装",
//   "プラスチック製カトラリー",
//   "プラスチック容器",
//   "プラスチックの蓋",
//   "プラスチックコップ",
//   "プラスチック製の箱",
//   "プラスチックケース",
//   "プラスチック製パレット",
//   "プラスチック包装材",
//   "プラスチック製フィルム",
//   "プラスチック製ストロー",
//   "プラスチック製の包装",
//   "プラスチック製のラップ",
//   "プラスチックのスプーン",
//   "プラスチックのフォーク",
//   "プラスチックのナイフ",
//   "プラスチック製品リサイクル",
//   "プラスチックのキャップ",
//   "プラスチック廃棄",
//   "プラスチック分別",
//   "プラスチックリサイクル",
//   "プラスチックの再利用",
//   "プラスチック回収",
//   "プラスチック製タッパー",
//   "プラスチック容器の蓋",
//   "プラスチック袋の削減",
//   "プラスチックのカバー",
//   "プラスチック製のチャック袋",
//   "プラスチック製のポット",
//   "プラスチック製のカートン",
//   "プラスチックパッケージ",
//   "プラスチック製品の廃棄物",
//   "プラスチックの削減",
//   "プラスチック製のボウル",
//   "プラスチック製の洗剤容器",
//   "プラスチック製の食器",
//   "プラスチック製のボトルキャップ",
//   "プラスチック製のブリスターパック",
//   "プラスチック製の飲料容器",
//   "プラスチック製のチューブ",
//   "プラスチック製のジャー",
//   "プラスチック製のパイプ",
//   "プラスチック製のグローブ",
//   "プラスチック製のペレット",
//   "プラスチック製のシール",
//   "プラスチック製のシート",
//   "ガラス瓶",
//   "ガラス片",
//   "ガラス容器",
//   "ガラスくず",
//   "ガラスの破片",
//   "割れたガラス",
//   "ガラス製品",
//   "ガラス廃棄物",
//   "ガラスジャー",
//   "ガラスボトル",
//   "ガラス食器",
//   "ガラスのカップ",
//   "ガラスのコップ",
//   "ガラス製のビン",
//   "ガラス製のフラスコ",
//   "ガラス製の器",
//   "ガラスの蓋",
//   "リサイクルガラス",
//   "廃棄ガラス",
//   "ガラス製の灰皿",
//   "ガラス製のランプ",
//   "ガラス製の照明器具",
//   "ガラスの破砕物",
//   "ガラスのリサイクル",
//   "ガラス製のボウル",
//   "ガラスの窓",
//   "ガラスのドア",
//   "ガラスの瓶詰め",
//   "ガラスのビン",
//   "ガラスのキャップ",
//   "ガラス製のキャンドルホルダー",
//   "ガラス製のコップ蓋",
//   "ガラス製の食器",
//   "ガラス製の飲料容器",
// "ガラス製のプレート",
// "ガラス製のショットグラス",
// "ガラス製のボトルキャップ",
// "ガラス製のフラスコ",
// "ガラス製の試験管",
// "ガラス製のビーカー",
// "ガラス製のデキャンタ",
// "ガラス製のコップ",
// "ガラス製のペンダントライト",
// "ガラス製のフラワーベース",
// "ガラス製の調味料ボトル",
// "ガラス製のサラダボウル",
// "ガラス製の保存容器",
// "ガラス製のジャー",
// "ガラス製の灰皿",
// "ガラス製のビン詰め",
// "紙くず",
// "段ボール",
// "新聞紙",
// "漫画本",
// "雑誌",
// "紙パック",
// "包装紙",
// "紙袋",
// "紙製品",
// "使用済み新聞",
// "古新聞",
// "広告チラシ",
// "雑誌の切れ端",
// "新聞の切れ端",
// "古雑誌",
// "紙の切れ端",
// "紙製の箱",
// "紙製のトレイ",
// "紙コップ",
// "紙皿",
// "紙の包装材",
// "紙のラベル",
// "紙の袋",
// "紙のリサイクル",
// "廃紙",
// "再生紙",
// "紙の段ボール",
// "使用済みノート",
// "古書",
// "紙製の封筒",
// "紙製のカートン",
// "紙製のカップ",
// "紙製の袋",
// "紙製のボウル",
// "紙製の封筒",
// "紙製のトレイ",
// "紙製のパレット",
// "紙製のボックス",
// "紙製のパッケージ",
// "紙製のラップ",
// "紙製の封筒",
// "紙のスクラップ",
// "紙製のカバー",
// "紙のリサイクルボックス",
// "紙のコンテナ",
// "紙のバインダー",
// "紙の封筒",
// "紙のフォルダー",
// "紙製のスリーブ",
// "紙の書類",
// "ガソリン",
// "ジッパー",
// "ライター",
// "危険物",
//   "有害廃棄物",
//   "化学薬品",
//   "バッテリー",
//   "塗料缶",
//   "殺虫剤",
//   "漂白剤",
//   "医療廃棄物",
//   "シンナー",
//   "エアゾール缶",
//   "毒性廃棄物",
//   "爆発物",
//   "鉛製品",
//   "水銀製品",
//   "ガソリン缶",
//   "引火性液体",
//   "溶剤",
//   "燃料",
//   "クリーン液",
//   "オイル",
//   "グリース",
//   "放射性廃棄物",
//   "PCB廃棄物",
//   "アスベスト",
//   "電子廃棄物",
//   "毒物",
//   "劇物",
//   "化学薬品容器",
//   "エンジンオイル",
//   "可燃性廃棄物",
//   "腐食性廃棄物",
//   "ガソリンタンク",
//   "ヘアスプレー缶",
//   "ホスゲン",
// ];

const categories = [
  // "火薬",
  // "防腐剤",
  // "化学兵器",
  // "毒性ガス",
  // "ガスボンベ",
  // "電池",
  // "水銀温度計",
  // "酸",
  // "アルカリ",
  // "溶接用ガス",
  // "化学溶液",
  // "シアン化物",
  // "食品残渣",
  // "腐った果物",
  // "魚の骨",
  // "鶏の骨",
  // "野菜の皮",
  // "果物の皮",
  // "卵の殻",
  // "茶殻",
  // "コーヒーかす",
  // "パンのかけら",
  // "魚の内臓",
  // "肉の切れ端",
  // "腐った野菜",
  // "使い古したお茶葉",
  // "お米の残り",
  // "腐ったミカン",
  // "腐ったリンゴ",
  // "腐ったバナナ",
  // "魚の頭",
  // "魚の皮",
  // "肉の脂身",
  // "腐ったイチゴ",
  // "腐ったブドウ",
  // "腐ったトマト",
  // "鶏の皮",
  // "骨付き肉の残り",
  // "魚の尻尾",
  // "魚の目玉",
  // "魚の鱗",
  // "海藻",
  // "牡蠣の殻",
  // "カニの殻",
  // "エビの殻",
  // "貝の殻",
  // "牡蠣の残り",
  // "魚の尾",
  // "鳥の骨",
  // "魚のひれ",
  // "腐ったレタス",
  // "腐ったキャベツ",
  // "腐ったジャガイモ",
  // "腐ったニンジン",
  // "腐った玉ねぎ",
  // "腐ったピーマン",
  // "腐ったキュウリ",
  // "腐ったナス",
  // "腐ったカボチャ",
  // "腐ったカリフラワー",
  // "腐ったブロッコリー",
  // "腐ったセロリ",
  // "腐ったスイカ",
  // "腐ったメロン",
  // "腐ったパイナップル",
  // "腐ったマンゴー",
  // "腐ったパパイヤ",
  // "腐った梨",
  // "腐った桃",
  // "腐ったプラム",
  // "腐ったザクロ",
  // "腐ったイチジク",
  // "腐ったアボカド",
  // "腐ったチェリー",
  // "腐ったブルーベリー",
  // "腐ったラズベリー",
  // "腐ったブラックベリー",
  // "腐ったトウモロコシ",
  // "腐ったサツマイモ",
  // "腐ったカブ",
  // "腐った大根",
  // "腐ったショウガ",
  // "腐ったニンニク",
  // "腐ったゴボウ",
  // "腐ったカツオ",
  // "腐ったマグロ",
  // "腐ったサーモン",
  // "腐ったイカ",
  // "腐ったタコ",
  // "腐ったアサリ",
  // "腐ったホタテ",
  // "腐ったミルク",
  // "腐ったヨーグルト",
  // "腐ったチーズ",
  // "腐ったバター",
  // "腐ったクリーム",
  // "腐ったソース",
  // "腐ったジャム",
  // "腐ったピクルス",
  // "腐ったオリーブ",
  // "腐ったトーフ",
  // "腐った味噌",
  // "腐った納豆",
  // "腐ったチーズケーキ",
  // "腐ったアップルパイ",
  // "腐ったパウンドケーキ",
  // "腐ったシフォンケーキ",
  // "腐ったクッキー",
  // "腐ったビスケット",
  "リサイクル可能なゴミ",
  "Recyclables ",
  "E-waste",
  "Organic waste",
  "Hazardous waste",
  "Burnable trash",
  "Non-burnable trash",
  "Plastic waste",
  "Medical waste",
  "Metal scraps",
  "Construction waste",
];

// const serpApi = `${process.env.SERPAPI_KEY}`;
const serpApi =
  // "3ed7f6d6a808dd7ed1218e3a898a94699994c208d6de0bab15459c35161d73f1";
  "8daddf87ce4831954c357342bbdc95cb889556908383c46b00236e824702591d";

if (!serpApi) {
  throw new Error(
    "SerpApi key not found. Please set your API key in the environment variable SERPAPI_KEY."
  );
}

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
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    await new Promise((resolve, reject) => {
      const ext = response.headers["content-type"].split("/")[1];
      const imgName = `${uuidv4()}.${ext}`;
      const writer = fs.createWriteStream(
        `${path}/images/${category}/${imgName}`
      );

      response.data.pipe(writer).on("finish", resolve).on("error", reject);
    });

    console.log(`Downloaded ${imgName}`);
  } catch (error) {
    console.log(`Error downloading ${url}`);
    return false;
  }
  return true;
}

async function scrapeImageUrls(query, numImages) {
  const urls = [];
  let page = 0;

  while (urls.length < numImages) {
    const params = {
      q: query,
      tbm: "isch",
      num: "100",
      api_key: serpApi,
    };

    try {
      const result = await new Promise((resolve, reject) => {
        search.json(params, (data) => {
          if (data && data.images_results) {
            resolve(data.images_results.map((img) => img.original));
          } else {
            reject(new Error("No images found: " + query));
          }
        });
      });

      urls.push(...result);

      if (result.length === 0) break; // Stop if no more results
      page++;
    } catch (error) {
      console.error(
        `Failed to retrieve images for query ${query}: ${error.message}`
      );
      break;
    }
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
      const urls = await scrapeImageUrls(category, "100");
      let count = urls.length;
      for (const url of urls) {
        const isDownloaded = await downloadImg(path, url, category);
        if (!isDownloaded) {
          count--;
        }
      }
      console.log(`Downloaded ${count} images for category ${category}`);
    }
  });

program.parse(process.argv);
