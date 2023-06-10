import React, { useEffect, useState } from "react";
const Hello = () => {
  const [obj, setObj] = useState({});

  const [txtFile, setTxtFile] = useState(
    "We are greeting to offer you the position of role at Equip."
  );
  const [sentance, setSentance] = useState([]);
  const [active, setActive] = useState([]);
  const [varName, setVarName] = useState([]);
  const [varValue, setVarValue] = useState([]);

  useEffect(() => {
    const updatedTxt = txtFile.split(" ");
    let updatedName = [];
    let updatedValue = [];
    updatedTxt.forEach((ele, key) => {
      updatedName.push(obj[ele] == undefined ? "var" + key : obj[ele]);
      updatedValue.push(isVar(ele) ? obj[getText[ele]] : ele);
    });
    setSentance(updatedTxt);
    setVarName(updatedName);
    setVarValue(updatedValue);
    setActive(new Array(updatedTxt.length).fill(false));
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
    <div>
      {sentance.map((ele, key) => {
        return (
          <span
            className={active[key] ? "offer-letter-textbox" : "none"}
            onClick={() => {
              const newActive = [...active];
              newActive[key] = true;
              setActive(newActive);
            }}
          >
            {getText(ele)}{" "}
          </span>
        );
      })}
      <br />
      {sentance.map((ele, key) => {
        if (active[key] === true) {
          let txt = getText(ele);
          return (
            <div
              style={{
                display: "flex",
                margin: "5px",
                width: "30vw",
                justifyContent: "space-evenly",
              }}
            >
              <input
                type="text"
                value={varName[key]}
                onChange={(e) => {
                  let newVarName = [...varName];
                  newVarName[key] = e.target.value;
                  setVarName(newVarName);
                }}
              />
              <input
                type="text"
                value={varValue[key]}
                onChange={(e) => {
                  let newVarValue = [...varValue];
                  newVarValue[key] = e.target.value;
                  setVarValue(newVarValue);
                  if (isVar(ele)) {
                    const newObj = { ...obj };
                    newObj[varName[key]] = e.target.value;
                    setObj(newObj);
                  }
                }}
              />
            </div>
          );
        } else {
          return <></>;
        }
      })}
      <button
        onClick={() => {
          const newSentance = [...sentance];
          const newObj = { ...obj };
          sentance.forEach((ele, key) => {
            if (active[key] && !isVar(ele)) {
              newSentance[key] = "$" + varName[key];
              newObj[varName[key]] = varValue[key];
            }
          });
          setSentance(newSentance);
          setObj(newObj);
        }}
      >
        Convert to variable
      </button>
      <br />
      <button
        onClick={() => {
          exportTemplate();
        }}
      >
        Export
      </button>
      <br />
      <button
        onClick={() => {
          importTemplate();
        }}
      >
        Import
      </button>
    </div>
  );
};

export default Hello;
