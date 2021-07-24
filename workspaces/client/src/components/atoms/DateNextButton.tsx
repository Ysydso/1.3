import { useDoesEntryExistForNextDate } from "graphql/queries";
import { useDate } from "context/useDate";
import React from "react";
import { Link } from "react-router-dom";

const nextButtonClassNames = (
  doesEntryExistForNextDate: boolean | undefined
): string =>
  `p-2 border rounded ${doesEntryExistForNextDate ? "font-bold" : ""}`;

const DateNextButton: React.FC = () => {
  const date = useDate();
  const doesEntryExistForNextDate = useDoesEntryExistForNextDate(date);
  return date.isToday() ? (
    <DateNextButtonDisabled />
  ) : (
    <Link to={`/page/${date.getNext().getKey()}`}>
      <button className={nextButtonClassNames(doesEntryExistForNextDate)}>
        next
      </button>
    </Link>
  );
};

const DateNextButtonDisabled: React.FC = () => (
  <button className="p-2 border rounded cursor-not-allowed opacity-50" disabled>
    next
  </button>
);

export default DateNextButton;
