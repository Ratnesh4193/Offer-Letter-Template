import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import logo from "./delete.png";
const OfferLetterTable = ({
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
  refs,
}) => {
  const navigate = useNavigate();
  return (
    <div className="offer-letter-table">
      <Row>
        <Col md={5} sm={12}>
          <div className="table-content heading">
            <h2>Name</h2>
          </div>
          {sentance.map((line, key1) => {
            return (
              <>
                {line.map((ele, key2) => {
                  if (active[key1][key2]) {
                    return (
                      <div className="table-content">
                        <input
                          type="text"
                          className="textbox "
                          value={varName[key1][key2]}
                          placeholder="Enter the Variable Name"
                          ref={refs[key1][key2]}
                          onFocus={(e) => {
                            e.target.select();
                          }}
                          onChange={(e) => {
                            let newVarName = [...varName];
                            newVarName[key1][key2] = e.target.value;
                            setVarName(newVarName);
                          }}
                        />
                      </div>
                    );
                  }
                })}
              </>
            );
          })}
        </Col>
        <Col md={5} sm={12}>
          <div className="table-content heading">
            <h2>Value</h2>
          </div>
          {sentance.map((line, key1) => {
            return (
              <>
                {line.map((ele, key2) => {
                  if (active[key1][key2]) {
                    return (
                      <div className="table-content">
                        <input
                          type="text"
                          className="textbox "
                          value={varValue[key1][key2]}
                          placeholder="Enter the Value"
                          onChange={(e) => {
                            let newVarValue = [...varValue];
                            newVarValue[key1][key2] = e.target.value;
                            setVarValue(newVarValue);
                            if (isVar(ele)) {
                              const newObj = { ...obj };
                              newObj[varName[key1][key2]] = e.target.value;
                              setObj(newObj);
                            }
                          }}
                        />
                      </div>
                    );
                  }
                })}
              </>
            );
          })}
        </Col>
        <Col md={1} sm={12}>
          <div className="table-content heading">
            <h2 style={{ opacity: "0.0" }}>None</h2>
          </div>
          {sentance.map((line, key1) => {
            return (
              <>
                {line.map((ele, key2) => {
                  if (active[key1][key2]) {
                    return (
                      <div className="table-content">
                        <button
                          className="btn btn2"
                          onClick={() => {
                            let curState = [...active];
                            curState[key1][key2] = 0;
                            setActive(curState);
                            if (isVar(ele) === false) {
                              let curActive = activeCount;
                              curActive--;
                              setActiveCount(curActive);
                            }
                          }}
                        >
                          <img src={logo} />
                        </button>
                      </div>
                    );
                  }
                })}
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <button
            className="btn btn-green"
            disabled={activeCount > 0 ? "" : "disabled"}
            onClick={() => {
              const newSentance = [...sentance];
              const newObj = { ...obj };
              sentance.forEach((line, key1) => {
                line.forEach((ele, key2) => {
                  if (active[key1][key2] && !isVar(ele)) {
                    newSentance[key1][key2] = "$" + varName[key1][key2];
                    newObj[varName[key1][key2]] = varValue[key1][key2];
                  }
                });
              });
              setSentance(newSentance);
              setObj(newObj);
              setActiveCount(0);
            }}
          >
            Convert to variable
          </button>
        </Col>
        <Col md={4} sm={12}>
          <button
            className="btn btn-blue"
            onClick={() => {
              exportTemplate();
            }}
          >
            Export Template
          </button>
        </Col>
        <Col md={4} sm={12}>
          <button
            className="btn btn-green"
            onClick={() => {
              navigate("/import");
            }}
          >
            Import Template
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default OfferLetterTable;
