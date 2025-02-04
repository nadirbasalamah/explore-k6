# explore-k6

API Performance testing example with k6.

## Available Tests

| Filename             | Description                           |
| -------------------- | ------------------------------------- |
| `src/test.js`        | Simple testing example                |
| `src/smoke.js`       | Smoke testing example                 |
| `src/average.js`     | Average load testing example          |
| `src/stress.js`      | Stress testing example                |
| `src/spike.js`       | Spike testing example                 |
| `src/endurance.js`   | Endurance testing example             |
| `src/create-post.js` | Create a post feature testing example |
| `src/update-post.js` | Update a post feature testing example |

## Prerequisites

1. [NodeJS](https://nodejs.org/en)
2. [k6](https://k6.io/)

## How to Use

1. Clone this repository.

2. Install the dependencies.

```sh
npm install
```

3. Run the test based on the feature.

```sh
k6 run filename
```

For example, the smoke test is executed.

```sh
k6 run src/smoke.js
```
