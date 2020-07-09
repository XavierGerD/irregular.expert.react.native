import React from "react";
import { tupletBracketCodes, tupletCodes } from "../UnicodeAssignment";

const tupletChecker = (i: number[]) => {
  switch (i[0]) {
    case 3:
      return tupletCodes.three;
    case 4:
      return tupletCodes.four;
    case 5:
      return tupletCodes.five;
    case 6:
      return tupletCodes.six;
    case 7:
      return tupletCodes.seven;
    default:
      return;
  }
};

const fillInTuplets = (size: number[]) => {
  //return array
  const tupletBrackets: JSX.Element[] = [];
  //push the left-hand side bracket
  tupletBrackets.push(<div>{tupletBracketCodes.left}</div>);
  //push the tuplet value number
  tupletBrackets.push(
    <div className="rp-tupletvalue">{tupletChecker(size)}</div>
  );
  //push the right-hand side bracket
  tupletBrackets.push(<div>{tupletBracketCodes.right}</div>);
  return tupletBrackets;
};

export { fillInTuplets };
