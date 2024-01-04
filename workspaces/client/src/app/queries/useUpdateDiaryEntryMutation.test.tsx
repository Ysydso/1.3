import { buildDiaryEntry, DiaryEntry } from "@diary/shared/types/diaryEntry";
import { renderHook, waitFor } from "@testing-library/react";
import { http } from "msw";
import { wrap } from "souvlaki";
import { diaryEntryUriTemplate } from "test/mocks/diaryEntryUriTemplate";
import { server } from "test/mocks/server";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it } from "vitest";
import { useUpdateDiaryEntryMutation } from "./useUpdateDiaryEntryMutation";

const wrapper = wrap(
  withQueryClient(),
  withAuth0Wrapper({ isAuthenticated: true })
);

describe("useUpdateDiaryEntryMutation", () => {
  it("returns the updated entry", async () => {
    const date = "2022-08-14";
    const diaryEntry = buildDiaryEntry({ date });

    const { result } = renderHook(useUpdateDiaryEntryMutation, { wrapper });
    result.current.mutate(diaryEntry);

    await waitFor(() =>
      expect(result.current.data?.diaryEntry).toEqual(diaryEntry)
    );
  });

  it("returns an error if fetch fails", async () => {
    server.use(
      http.post(diaryEntryUriTemplate, () => new Response(null, { status: 404 }))
    );

    const { result } = renderHook(useUpdateDiaryEntryMutation, { wrapper });
    result.current.mutate(buildDiaryEntry({ date: "2022-08-17" }));

    await waitFor(() =>
      expect(result.current.error).toStrictEqual(expect.any(Error))
    );
  });

  it("returns an error if the diaryEntry is not valid", async () => {
    const { result } = renderHook(useUpdateDiaryEntryMutation, { wrapper });
    result.current.mutate({ date: "2022-08-17" } as DiaryEntry);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
