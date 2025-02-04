import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 3, // 3 virtual users
  duration: "40s", // duration is 40 seconds
};

export default function () {
  // sends GET request
  const response = http.get("https://jsonplaceholder.typicode.com/posts");

  // validate the response
  check(response, {
    "is status 200": (r) => r.status === 200,
    "is not null": (r) => r.json() !== null,
  });
}
