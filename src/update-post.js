import http from "k6/http";
import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { getRandomPost } from "./helper/random.js";

export const options = {
  vus: 20,
  duration: "30s",
};

const csvData = new SharedArray("sample user dataset", () => {
  // load CSV file
  return papaparse.parse(open("../resources/posts.csv"), { header: true }).data;
});

export default function () {
  describe("Update a post", () => {
    // get random post data from CSV
    const { postData, id } = getRandomPost(csvData);

    // prepare request body
    const requestBody = {
      title: postData.title,
      body: postData.body,
      userId: postData.userId,
    };

    // sends PUT request
    const response = http.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      JSON.stringify(requestBody),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const jsonResponse = response.json();

    // perform assertions with k6chaijs
    expect(response.status, "response status").to.equal(200);
    expect(response).to.have.validJsonBody();
    expect(jsonResponse.id, "post ID").to.be.above(0);
    expect(jsonResponse.title, "title").to.not.equal(null);
    expect(jsonResponse.body, "body").to.not.equal(null);
    expect(jsonResponse.userId, "user ID").to.be.above(0);
  });
}
