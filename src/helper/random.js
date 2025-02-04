export function getRandomPost(csvData) {
  let randIndex = getRandomInt(0, csvData.length);
  return {
    postData: csvData[randIndex],
    id: randIndex,
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
