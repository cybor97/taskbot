import { Api, HttpClient } from "tonapi-sdk-js";
import { config } from "../config";

export function getTonapiClient() {
  const httpClient = new HttpClient({
    baseUrl: "https://tonapi.io",
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${config.tonapi.key}`,
        "Content-type": "application/json",
      },
    },
  });
  const client = new Api(httpClient);
  return client;
}
