import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { getFiles } from "../../context/UserContext";

export default function Dashboard(props) {
  var [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles(setFiles);
  }, []);

  const folderItem = (file) => {
    return (
      <Box className="file-icon" style={{ margin: 20, width: "15%", textAlign: "center" }}>
        <img
          alt={file}
          style={{ cursor: "pointer", height: 80 }}
          src="/icons/file.png"
        />
        <p>{file}</p>
      </Box>
    );
  };

  return (
    <>
      {/* <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget noBodyPadding bodyClass={classes.tableWidget}>
            {files.length && <Table data={files} />}
          </Widget>
        </Grid>
      </Grid> */}
      <Grid container spacing={3}>
        {files.length &&
          files.map((file, ind) => {
            return folderItem(file);
          })}
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
