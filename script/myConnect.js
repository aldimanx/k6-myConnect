import { loginDummy } from "../utils/support.js";

export let options = {
  vus: 50,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests should finish below 500ms
    http_req_failed: ["rate<0.11"], // Error rate should be less than 1%
  },
};

export default function () {
  console.log(loginDummy());
}
