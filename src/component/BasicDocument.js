import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import React from "react";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    margin: 5,
    padding: 5,
  },
  heading: {
    margin: 10,
    padding: 10,
    fontSize: "20px",
    textAlign: "center",
    textDecoration: "underline",
    textDecorationThickness: "auto",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
function BasicDocument({ sentance, getText }) {
  let displayText = [];
  sentance.forEach((line) => {
    let txt = "";
    line.forEach((ele) => {
      txt += getText(ele) + " ";
    });
    displayText.push(txt);
  });
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.heading}>
            <Text>Job Offer</Text>
          </View>
          {displayText.map((ele) => {
            return (
              <View style={styles.section}>
                <Text>{ele}</Text>
              </View>
            );
          })}
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default BasicDocument;
