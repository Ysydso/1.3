import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { http, HttpResponse } from "msw";
import { diaryEntryUriTemplate } from "./diaryEntryUriTemplate";

export const handlers = [
  http.get(diaryEntryUriTemplate, ({ params }) =>
    HttpResponse.json({
      diaryEntry: buildDiaryEntry({ date: params.date as string }),
    })
  ),

  http.post(diaryEntryUriTemplate, async ({ request }) =>
    HttpResponse.json(await request.json()))
];
