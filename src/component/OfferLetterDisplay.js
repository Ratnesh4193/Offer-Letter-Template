import React from "react";
const OfferLetterDisplay = ({
  txtFile,
  setTxtFile,
  obj,
  setObj,
  sentance,
  setSentance,
  active,
  setActive,
  varName,
  setVarName,
  varValue,
  setVarValue,
  isVar,
  getText,
  exportTemplate,
  importTemplate,
  setPdf,
  activeCount,
  setActiveCount,
}) => {
  return (
    <div className="offer-letter-display">
      <div className="offer-letter">
        {sentance.map((line, key1) => {
          return (
            <p>
              {line.map((ele, key2) => {
                return (
                  <span
                    className={
                      active[key1][key2] ? "offer-letter-textbox" : "none"
                    }
                    onClick={() => {
                      const newActive = [...active];
                      newActive[key1][key2] = true;
                      setActive(newActive);
                      if (isVar(ele) === false) {
                        let curActive = activeCount;
                        curActive++;
                        setActiveCount(curActive);
                      }
                    }}
                  >
                    {getText(ele)}{" "}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
      <div>
        <button
          className="btn btn-green"
          onClick={() => {
            setPdf(1);
          }}
        >
          Save Offer Letter
        </button>
      </div>
    </div>
  );
};

export default OfferLetterDisplay;
