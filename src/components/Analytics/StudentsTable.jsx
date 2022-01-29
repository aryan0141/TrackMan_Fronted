import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row({ data }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.name}
        </TableCell>
        <TableCell align="center">{data.classesAttended}</TableCell>
        <TableCell align="center">{data.duration}</TableCell>
        <TableCell align="center">
          {data.duration + data.classesAttended}
        </TableCell>
        <TableCell align="center">{98}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography>Email: {data.email}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ props }) {
  return (
    <TableContainer component={Paper} style={{ border: "1px solid #a9a9a9", borderBottom: 0, margin: "2px auto 40px auto"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="center">Classes Attented</TableCell>
            <TableCell align="center">Min Watched</TableCell>
            <TableCell align="center">Chats Score</TableCell>
            <TableCell align="center">Overall Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((data, index) => (
            <Row key={index} data={data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
