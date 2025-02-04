import http from "k6/http";
import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.5.0.1/index.js";
import {
  randomIntBetween,
  randomString,
} from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  describe("Create a new post", () => {
    // prepare request body
    const requestBody = {
      title: randomString(20),
      body: randomString(200),
      userId: randomIntBetween(1, 99),
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

    // convert to JSON
    const jsonResponse = response.json();

    // perform assertions with k6chaijs
    expect(response.status, "response status").to.equal(201);
    expect(response).to.have.validJsonBody();
    expect(jsonResponse.id, "post ID").to.be.above(0);
    expect(jsonResponse.title, "title").to.not.equal(null);
    expect(jsonResponse.body, "body").to.not.equal(null);
    expect(jsonResponse.userId, "user ID").to.be.above(0);
  });
}
