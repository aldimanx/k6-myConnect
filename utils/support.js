import http from "k6/http";
import { check } from "k6";
import { loginPayload } from "../payload/myConnect.js";

export function loginDummy() {
  let payload = loginPayload;
  payload.username = "emilys";

  let headers = {
    "Content-Type": "application/json",
  };

  let resLoginDummy = http.post(
    "https://dummyjson.com/auth/login",
    JSON.stringify(payload),
    {
      headers: headers,
    }
  );

  check(resLoginDummy, {
    "is status 200": (r) => r.status === 200,
  });

  let body = JSON.parse(resLoginDummy.body);
  return {
    username: body.username,
  };
}
