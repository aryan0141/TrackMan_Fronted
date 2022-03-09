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
import { Filters } from "./Filters";

function Row({ data, classroomDetails }) {
  const [open, setOpen] = React.useState(false);
  const totalChats = 0;
  for (var i = 0; i < data.length; i++) {
    totalChats += data[i].comments;
  }

  const normalizedAttendance = classroomDetails.totalClasses
    ? data.classesAttended / classroomDetails.totalClasses
    : 0;
  const normalizedTime = classroomDetails.totalDuration
    ? data.duration / classroomDetails.totalDuration
    : 0;
  const normalizedChats = totalChats ? data.comments / totalChats : 0;
  const overallScore = (
    normalizedAttendance * classroomDetails.weightAge[1] +
    normalizedTime * classroomDetails.weightAge[0] +
    normalizedChats * classroomDetails.weightAge[2]
  ).toFixed(2);

  const minsWathched =
    data.duration > 180
      ? `${parseInt(data.duration / 60)}hrs ${parseInt(data.duration % 60)}mins`
      : `${parseInt(data.duration)}mins`;

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
        <TableCell align="center">{minsWathched}</TableCell>
        <TableCell align="center">{data.comments}</TableCell>
        <TableCell align="center">{overallScore}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography>Email: {data.email}</Typography>
              <Typography>
                Attendance:{" "}
                {classroomDetails.totalClasses == 0
                  ? 0
                  : `${
                      (data.classesAttended / classroomDetails.totalClasses) *
                      100
                    }%`}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ resp, studentsData }) {
  // const data = studentsData;
  console.log(resp);

  const [data, setData] = React.useState(studentsData);
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <React.Fragment>
      <Filters
        data={resp.StudentsData}
        query={searchQuery}
        studentsData={data}
        onChange={(data, query) => {
          setData([...data]);
          setSearchQuery(query);
        }}
      />
      <TableContainer
        component={Paper}
        style={{
          border: "1px solid #a9a9a9",
          borderBottom: 0,
          margin: "2px auto 40px auto",
        }}
      >
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
            {data.length == 0 ? (
              <Typography variant="text" color="textSecondary">
                No results found
              </Typography>
            ) : (
              data
                .filter((data) => data.name.toLowerCase().includes(searchQuery))
                .map((data, index) => (
                  <Row key={index} data={data} classroomDetails={resp} />
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
