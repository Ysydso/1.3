import { buildDiaryEntry } from "@diary/shared/types/buildDiaryEntry";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { getConfiguredApp } from "./app";

describe("app", () => {
  it("retrieves an empty diary entry", async () => {
    const response = await request(getConfiguredApp()).get("/diaryentry/TEST");

    expect(response.body).toEqual({
      diaryEntry: buildDiaryEntry({ date: "TEST" }),
    });
  });
});