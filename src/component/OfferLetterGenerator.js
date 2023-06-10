import React, { useState, useEffect, useRef } from "react";
import BasicDocument from "./BasicDocument";
import OfferLetterDisplay from "./OfferLetterDisplay";
import OfferLetterTable from "./OfferLetterTable";
import { Row, Col } from "react-bootstrap";

const OfferLetterGenerator = ({ txtFile, setTxtFile, obj, setObj }) => {
  let [pdf, setPdf] = useState(0);
  const [sentance, setSentance] = useState([]);
  const [active, setActive] = useState([]);
  const [varName, setVarName] = useState([]);
  const [varValue, setVarValue] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const refTemp = useRef(null);
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    console.log(txtFile, obj);
    let updatedTxt = [];
    let updatedName = [];
    let updatedValue = [];
    let activeValue = [];
    let curRef = [];

    txtFile.forEach((txt, key1) => {
      let curUpdatedText = txt.split(" ");
      let curUpdateName = [];
      let curUpdateValue = [];
      let curUpdatedRef = [];

      curUpdatedText.forEach((ele, key2) => {
        const word = ele[0] === "$" ? ele.substring(1) : ele;
        curUpdateName.push(
          obj.hasOwnProperty(word) ? word : "var" + key1 + "." + key2
        );
        curUpdateValue.push(isVar(ele) ? obj[word] : ele);
        curUpdatedRef.push(refTemp);
      });
      updatedTxt.push(curUpdatedText);
      updatedName.push(curUpdateName);
      updatedValue.push(curUpdateValue);
      activeValue.push(new Array(curUpdatedText.length).fill(false));
      curRef.push(curUpdatedRef);
    });
    setSentance(updatedTxt);
    setVarName(updatedName);
    setVarValue(updatedValue);
    setActive(activeValue);
    setRefs(curRef);
  }, [txtFile]);

  const isVar = (txt) => {
    return txt != undefined && txt.length > 0 && txt[0] === "$";
  };
  const getText = (txt) => {
    return txt != undefined && txt.length > 0 && isVar(txt)
      ? obj[txt.substring(1)]
      : txt;
  };

  const downloadObjectAsText = (data) => {
    const dataBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: "text/plain",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(dataBlob);
    a.setAttribute("download", "data.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Export the document as a text file.
  const exportTemplate = () => {
    let txtDoc = [];
    sentance.forEach((line) => {
      let txt = "";
      line.forEach((ele) => {
        txt += ele + " ";
      });
      txtDoc.push(txt.trim());
    });
    let newObj = obj;
    obj["newTemplate"] = txtDoc;
    downloadObjectAsText(newObj);
  };

  return (
    <>
      {pdf === 0 && (
        <>
          <Row>
            <Col md={6}>
              <OfferLetterDisplay
                txtFile={txtFile}
                setTxtFile={setTxtFile}
                obj={obj}
                setObj={setObj}
                sentance={sentance}
                setSentance={setSentance}
                active={active}
                setActive={setActive}
                varName={varName}
                setVarName={setVarName}
                varValue={varValue}
                setVarValue={setVarValue}
                isVar={isVar}
                getText={getText}
                exportTemplate={exportTemplate}
                setPdf={setPdf}
                activeCount={activeCount}
                setActiveCount={setActiveCount}
                refs={refs}
              />
            </Col>
            <Col md={6}>
              <OfferLetterTable
                txtFile={txtFile}
                setTxtFile={setTxtFile}
                obj={obj}
                setObj={setObj}
                sentance={sentance}
                setSentance={setSentance}
                active={active}
                setActive={setActive}
                varName={varName}
                setVarName={setVarName}
                varValue={varValue}
                setVarValue={setVarValue}
                isVar={isVar}
                getText={getText}
                exportTemplate={exportTemplate}
                setPdf={setPdf}
                activeCount={activeCount}
                setActiveCount={setActiveCount}
                refs={refs}
              />
            </Col>
          </Row>
        </>
      )}
      {pdf === 1 && (
        <BasicDocument sentance={sentance} getText={getText} setPdf={setPdf} />
      )}
    </>
  );
};

export default OfferLetterGenerator;
