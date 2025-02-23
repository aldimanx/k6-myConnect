# k6 Performance Testing Template

This is a template repository for setting up performance and load testing with [k6](https://k6.io/). Use this project as a foundation for writing and running performance tests for your applications and services.

## Table of Contents

- [Getting Started](#getting-started)
- [Setup](#setup)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Example Test](#example-test)

---

## Getting Started

To get started with this template, you can clone the repository and set up your environment to run k6 tests. This project is configured to help you quickly write and execute load testing scripts using k6.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/k6-performance-tests.git
   cd k6-performance-tests
   ```

2. **Install k6:**
   You can install k6 globally or use it directly from your command line.

   - **Using Homebrew (macOS)**
     ```bash
     brew install k6
     ```
   - **Using Chocolatey (Windows)**
     ```bash
     choco install k6
     ```
   - **Download from k6.io**
     [Download and install k6](https://k6.io/docs/getting-started/installation/)

3. **Install dependencies (if any):**
   ```bash
   npm install
   ```

## Writing Tests

All test scripts should be placed in the `tests` directory. k6 uses JavaScript to define performance tests, which makes it easy to write and understand load testing scenarios.

### Example Directory Structure

```
k6-performance-tests/
│
├── scripts/
│   ├── script.js
│   └── example_test.js
│
├── package.json
└── README.md
```

## Running Tests

You can run your k6 test scripts using the following npm scripts or k6 commands:

- **Basic Test Run:**

  ```bash
  npm run test
  ```

  or

  ```bash
  k6 run tests/script.js
  ```

- **Run Test Against Staging Environment:**

  ```bash
  npm run test:staging
  ```

- **Run Test Against Production Environment:**
  ```bash
  npm run test:production
  ```

## Configuration

You can configure environment-specific settings in your k6 scripts using `__ENV`. This allows you to pass environment variables into your test scenarios.

Example:

```javascript
import http from "k6/http";
import { check } from "k6";

export default function () {
  const url =
    __ENV.ENV === "staging"
      ? "https://staging.example.com"
      : "https://production.example.com";
  const res = http.get(url);
  check(res, { "status is 200": (r) => r.status === 200 });
}
```

## Example Test

Here's a simple k6 test script example:

```javascript
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 }, // ramp-up to 10 users
    { duration: "1m", target: 10 }, // hold at 10 users
    { duration: "10s", target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  const res = http.get("https://test-api.example.com");
  check(res, { "status was 200": (r) => r.status === 200 });
  sleep(1);
}
```
