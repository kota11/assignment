import {
  describe,
  expect,
  test,
} from "vitest";

import {
  escapeCSV,
} from "./csv";

describe(
  "escapeCSV",
  () => {
    test(
      "escapes quotes",
      () => {
        expect(
          escapeCSV(
            'hello "world"'
          )
        ).toBe(
          '"hello ""world"""'
        );
      }
    );
  }
);