import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
const ImportTemplate = ({ txtFile, setTxtFile, obj, setObj }) => {
  const navigate = useNavigate();

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
        navigate("/");
      };
    };

    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className="centered-container">
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col xs={6}>
            <div className="box">
              <Button
                variant="success"
                className="w-100"
                onClick={() => {
                  importTemplate();
                }}
              >
                Import Template
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ImportTemplate;
