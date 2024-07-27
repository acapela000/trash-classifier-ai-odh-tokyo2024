interface BoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Prediction {
  class: string;
  confidence: number;
  bounding_box: BoundingBox;
}

export interface ApiResponse {
  predictions: Prediction[];
}

export function detectObjectApi() {
    const axios = require("axios");
    const fs = require("fs");
    const image = fs.readFileSync("../../../public/images.jpg", {
        encoding: "base64",
    });
    axios({
        method: "POST",
        url: "https://detect.roboflow.com/waste-classification-uwqfy/1",
        params: {
            api_key: "ByF1MpGEBYqtKwStHdX9",
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then(function (response: any) {
        console.log(response.data);
    })
        .catch(function (error: any) {
        console.log(error.message);
    });
}


