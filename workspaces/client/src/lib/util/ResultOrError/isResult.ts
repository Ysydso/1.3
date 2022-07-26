import { type ResultOrError, type SuccessResult } from "../types/either.types";

export function isResult<T>(
  resultOrError: ResultOrError<T>
): resultOrError is SuccessResult<T> {
  return "result" in resultOrError;
}