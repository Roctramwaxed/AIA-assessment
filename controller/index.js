const axios = require("axios");
const convert = require("xml-js");

class Controller {
  static async getImageList(req, res) {
    try {
      let url = "https://www.flickr.com/services/feeds/photos_public.gne";
      if (req.body.tags.length) {
        url += `?tags=${req.body.tags.split(" ").join(",")}`;
      }

      const response = await axios.get(url);
      let data = convert.xml2js(response.data, {
        compact: true,
        spaces: 2,
      });
      data = data.feed.entry.slice(0, 9);
      res.status(200).send(data);
    } catch (err) {
      console.log("error:", err);
      res.status(500).send(err);
    }
  }
}

module.exports = Controller;
