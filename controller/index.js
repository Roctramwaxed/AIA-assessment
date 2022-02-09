const axios = require("axios");
const convert = require("xml-js");

class Controller {
  static async getImageList(req, res) {
    const tags = req.body.tags;
    try {
      let url = "https://www.flickr.com/services/feeds/photos_public.gne";
      if (tags?.length) {
        url += `?tags=${tags.split(" ").join(",")}`;
      }
      console.log(url);

      const response = await axios.get(url);
      let data = convert.xml2js(response.data, {
        compact: true,
        spaces: 2,
      });
      data =
        data.feed.entry?.filter((e) =>
          e.link
            .find((link) => link._attributes.type === "image/jpeg")
            ._attributes.href.match(/.jpg/g)
        ) || [];
      res.status(200).send(data);
    } catch (err) {
      console.log("error:", err);
      res.status(500).send(err);
    }
  }
}

module.exports = Controller;
