import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import OfferLetterGenerator from "./component/OfferLetterGenerator";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ImportTemplate from "./component/ImportTemplate";
const App = () => {
  const [txtFile, setTxtFile] = useState([
    "Dear Candidate",
    "We are pleased to offer you the position of Software Developer at Equip",
    "The terms and conditions of your employment are as follows:",
    "Salary: Rs 2500000 per year",
    "Benefits: Health insurance, paid time off, retirement plan",
    "Please review this offer carefully and sign the acceptance letter attached to this email. We look forward to welcoming you to our team",
    "Sincerely",
    "Equip",
    "HR Manager Equip",
  ]);
  const [obj, setObj] = useState({});
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <OfferLetterGenerator
              txtFile={txtFile}
              setTxtFile={setTxtFile}
              obj={obj}
              setObj={setObj}
            />
          }
        />
        <Route
          path="/import"
          element={
            <ImportTemplate
              txtFile={txtFile}
              setTxtFile={setTxtFile}
              obj={obj}
              setObj={setObj}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
