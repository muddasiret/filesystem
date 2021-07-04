import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { addUser, getFiles } from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AddUser() {
  const classes = useStyles();

  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [files, setFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState([]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    console.log(selectedIndex);
  };
  useEffect(() => {
    getFiles(setFiles);
  }, []);

  const addFiles = (file) => {
    let filearray = [...fileList];
    if (!fileList.includes(file)) {
      filearray.push(file); //adding to array because value doesnt exists
      setFileList(filearray);
    } else {
      filearray.splice(filearray.indexOf(file), 1); //deleting
      setFileList(filearray);
    }
    console.log(fileList.length);
  };

  return (
    <>
      <PageTitle title="Enter Name & Password" />
      <FormControl style={{ width: "35%" }}>
        <TextField
          style={{ marginBottom: 20 }}
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          id="my-input"
          type="text"
          placeholder="Name"
          aria-describedby="my-helper-text"
        />
        <TextField
          style={{ marginBottom: 20 }}
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          id="my-pass"
          type="password"
          placeholder="Password"
          aria-describedby="my-helper-text"
        />
        <PageTitle title="Select Files for access" />
        <Box marginBottom={3}>
        {files.length &&
          files.map((file, ind) => {
            return (
              <div key={ind} style={{ display: "flex", marginLeft: -10 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fileList.indexOf(file) >= 0}
                      onChange={() => addFiles(file)}
                      name={file}
                      color="primary"
                    />
                  }
                  label={file}
                />
              </div>
            );
          })}
                  </Box>
        <Button
          onClick={() =>
            fileList.length
              ? addUser(loginValue, passwordValue, fileList)
              : alert("select atleast a file")
          }
          variant="contained"
          color="primary"
          size="large"
        >
          Add
        </Button>
      </FormControl>
    </>
  );
}
