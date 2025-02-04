import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "10m", target: 100 }, // traffic ramp-up from 1 to 100 users over 10 minutes.
    { duration: "30m", target: 100 }, // stay at 100 users for 30 minutes
    { duration: "10m", target: 0 }, // ramp-down to 0 users
  ],
};

// function for generating random string
const generateRandomString = (start, end) => {
  const res = Math.random().toString(36).substring(start, end);
  return res;
};

// function for generating random ID
const generateRandomId = () => {
  const id = Math.floor(Math.random() * 1000);
  return id;
};

export default function () {
  // prepare request body
  const requestBody = {
    title: generateRandomString(1, 7),
    body: generateRandomString(1, 20),
    userId: generateRandomId(),
  };

  // sends POST request
  const response = http.post(
    "https://jsonplaceholder.typicode.com/posts",
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
    "is status 201": (r) => r.status === 201,
    "is not null": (r) => r.json() !== null,
    "is contains valid id": (r) => r.json().id > 0,
    "is contains valid title": (r) => r.json().title !== "",
    "is contains valid body": (r) => r.json().body !== "",
  });
}
