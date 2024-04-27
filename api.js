const { inspect } = require("util");
const express = require("express");
const { AuthDataValidator } = require("@telegram-auth/server");
const { urlStrToAuthDataMap } = require("@telegram-auth/server/utils");

function initAPI() {
  const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });

  const app = express();

  app.use(async (req, res) => {
    try {
      console.log(Object.entries(req.query));

      const user = await validator.validate(Object.entries(req.query));

      console.log(user);

      res.status(200).send({ user });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: inspect(error) });
    }
  });
  app.listen(process.env.PORT ?? 5175, "localhost", () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

module.exports = {
  initAPI,
};
