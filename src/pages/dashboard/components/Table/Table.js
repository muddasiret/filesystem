import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Box,
} from "@material-ui/core";
import useStyles from "../../styles";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = ["Name", "Download"]; // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item,ind) => (
          <TableRow key={ind}>
            <TableCell className="pl-3 fw-normal">{item}</TableCell>
            <TableCell>
              <Box onClick={()=>alert('Download success')}>
                <GetAppRoundedIcon />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
