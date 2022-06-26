import { DateContext } from "app/context/date/DateContext";
import { DiaryDate } from "lib/util/date";
import React from "react";
import { createHelper } from "souvlaki";

export const withDate = createHelper(
  (value?: DiaryDate): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <DateContext.Provider value={value ?? new DiaryDate()}>
          {children}
        </DateContext.Provider>
      )
);