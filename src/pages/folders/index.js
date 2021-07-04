import React, { useState } from "react";
import { Box, Grid, Link } from "@material-ui/core";
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded";

export default function Folders(props) {
  const folderItem = () => {
    return (
      <Link href="#/app/folder/2">
        <Box style={{ margin: 20, textAlign: "center" }}>
          <img style={{ height: 100 }} src="/icons/foldericon.png" />
          <p>Folder 1</p>
        </Box>
      </Link>
    );
  };
  return (
    <>
      <Grid container spacing={4}>
        {folderItem()}
        {folderItem()}
        {folderItem()}
      </Grid>
    </>
  );
}
