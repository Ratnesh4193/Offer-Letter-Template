import React, { useState, useEffect } from "react";
import BasicDocument from "./BasicDocument";
import OfferLetterDisplay from "./OfferLetterDisplay";
import OfferLetterTable from "./OfferLetterTable";
import { Row, Col } from "react-bootstrap";

const OfferLetterGenerator = () => {
  let [pdf, setPdf] = useState(0);
  const [obj, setObj] = useState({});

  const [txtFile, setTxtFile] = useState([
    "Dear Candidate",
    "We are pleased to offer you the position of Software Developer at Equip",
    "The terms and conditions of your employment are as follows:",
    "Role: Software Developer",
    "Salary: Rs 2500000 per year",
    "Benefits: Health insurance, paid time off, retirement plan",
    "Please review this offer carefully and sign the acceptance letter attached to this email. We look forward to welcoming you to our team",
    "Sincerely",
    "Equip",
    "HR Manager Equip",
  ]);
  const [sentance, setSentance] = useState([]);
  const [active, setActive] = useState([]);
  const [varName, setVarName] = useState([]);
  const [varValue, setVarValue] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  useEffect(() => {
    let updatedTxt = [];
    let updatedName = [];
    let updatedValue = [];
    let activeValue = [];

    txtFile.forEach((txt, key1) => {
      let curUpdatedText = txt.split(" ");
      let curUpdateName = [];
      let curUpdateValue = [];
      curUpdatedText.forEach((ele, key2) => {
        curUpdateName.push(obj[ele] == undefined ? "var" + key2 : obj[ele]);
        curUpdateValue.push(isVar(ele) ? obj[getText[ele]] : ele);
      });
      updatedTxt.push(curUpdatedText);
      updatedName.push(curUpdateName);
      updatedValue.push(curUpdateValue);
      activeValue.push(new Array(curUpdatedText.length).fill(false));
    });
    setSentance(updatedTxt);
    console.log(updatedName);
    setVarName(updatedName);
    setVarValue(updatedValue);
    setActive(activeValue);
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
    let txtDoc = "";
    sentance.forEach((ele) => {
      txtDoc += ele + " ";
    });
    let newObj = obj;
    obj["newTemplate"] = txtDoc;
    downloadObjectAsText(newObj);
  };

  const importTemplate = () => {
    const a = document.createElement("input");
    a.setAttribute("type", "file");
    a.setAttribute("id", "template-input");

    document.body.appendChild(a);
    a.onchange = () => {
      const selectedFile = a.files[0];
      const reader = new FileReader();
      reader.readAsText(selectedFile);

      // Define the function to be executed when the file is loaded
      reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        setTxtFile(data["newTemplate"]);
        delete data["newTemplate"];
        setObj(data);
      };
    };

    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      {pdf === 0 && (
        <>
          <div className="page-heading">Offer Letter Builder</div>
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
                importTemplate={importTemplate}
                setPdf={setPdf}
                activeCount={activeCount}
                setActiveCount={setActiveCount}
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
                importTemplate={importTemplate}
                setPdf={setPdf}
                activeCount={activeCount}
                setActiveCount={setActiveCount}
              />
            </Col>
          </Row>
        </>
      )}
      {pdf === 1 && <BasicDocument sentance={sentance} getText={getText} />}
    </>
  );
};

export default OfferLetterGenerator;
