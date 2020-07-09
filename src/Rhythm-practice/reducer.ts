export const parsingReducer = (accumulator: string, currentValue: string) =>
  parseInt(accumulator) + parseInt(currentValue);

export const reducer = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;
