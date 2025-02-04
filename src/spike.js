import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 500 }, // fast ramp-up without any break
    { duration: "1m", target: 0 }, // quick ramp-down
  ],
};

// function for generating random string
const generateRandomString = (start, end) => {
  const res = Math.random().toString(36).substring(start, end);
  return res;
};

// function for generating random ID
const generateRandomId = () => {
  const id = Math.floor(Math.random() * 100);
  return id;
};

export default function () {
  const sampleId = generateRandomId();

  // prepare request body
  const requestBody = {
    title: generateRandomString(1, 7),
    body: generateRandomString(1, 20),
    userId: sampleId,
  };

  // sends PUT request
  const response = http.put(
    `https://jsonplaceholder.typicode.com/posts/${sampleId}`,
    JSON.stringify(requestBody),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  // validate the response
  check(response, {
    "is status 200": (r) => r.status === 200,
    "is not null": (r) => r.json() !== null,
    "is contains valid id": (r) => r.json().id > 0,
    "is contains valid title": (r) => r.json().title !== "",
    "is contains valid body": (r) => r.json().body !== "",
  });
}
