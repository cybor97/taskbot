const express = require("express");
const { AuthDataValidator } = require("@telegram-auth/server");
const { urlStrToAuthDataMap } = require("@telegram-auth/server/utils");

function initAPI() {
  const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });

  const app = express();

  app.use(async (req, res) => {
    try {
      const data = urlStrToAuthDataMap(req.url);
      // validate the data by passing the map to the validator
      const user = await validator.validate(data);

      console.log(user);

      res.status(200).send({ user });
    } catch (error) {
      console.error(error);
    }
  });
  app.listen(process.env.PORT ?? 5175, "localhost", () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

module.exports = {
  initAPI,
};
