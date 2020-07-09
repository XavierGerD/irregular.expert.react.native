import { timeSignatureCodes } from "../UnicodeAssignment";
import { reducer } from "./reducer";

let getTimeSig = (e: number[], mode: string) => {
  // in bar mode, 8 eight note is actually 4/4
  let totalValue = e.reduce(reducer, 0);
  if (mode === "bar" && totalValue === 8) {
    totalValue = 4;
  }
  switch (totalValue) {
    case 1:
      return timeSignatureCodes.one;
    case 2:
      return timeSignatureCodes.two;
    case 3:
      return timeSignatureCodes.three;
    case 4:
      return timeSignatureCodes.four;
    case 5:
      return timeSignatureCodes.five;
    case 6:
      return timeSignatureCodes.six;
    case 7:
      return timeSignatureCodes.seven;
    case 8:
      return timeSignatureCodes.eight;
    default:
      return "none";
  }
};

export default getTimeSig;
