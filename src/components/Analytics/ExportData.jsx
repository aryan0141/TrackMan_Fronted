import React from "react";
import { Button, Typography } from "@mui/material";
import { CSVLink } from "react-csv";
import { Box } from "@mui/system";

export const ExportData = ({ studentsData, classroomDetails }) => {
  // Export CSV-
  var date = new Date().toDateString();
  const createCsvFileName = () =>
    `${classroomDetails.name}_${date}_AllStudentsData.csv`;
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Classes Attended", key: "classes_attended" },
    { label: "Time Watched", key: "time_watched" },
    { label: "Comments", key: "comments" },
    { label: "Overall Score", key: "overall_socre" },
    { label: "Attendance", key: "attendance" },
  ];

  let data = [];
  studentsData && studentsData.forEach((item) => {
    data.push({
      name: item.name,
      email: item.email,
      classes_attended: item.classesAttended,
      time_watched:
        item.duration > 180
          ? `${parseInt(item.duration / 60)}hrs ${parseInt(
              item.duration % 60
            )}mins`
          : `${parseInt(item.duration)}mins`,
      comments: item.comments,
      overall_socre: item.overallScore,
      attendance:
        classroomDetails.totalClasses == 0
          ? 0
          : `${(item.classesAttended / classroomDetails.totalClasses) * 100}%`,
    });
  });
  return (
    <React.Fragment>
      <Typography variant="text" color="textSecondary">
        Export Options
      </Typography>
      <Box style={{ margin: "10px 0px" }}>
        <CSVLink
          data={data}
          headers={headers}
          filename={createCsvFileName()}
          target="_blank"
          style={{ textDecoration: "none", outline: "none", height: "5vh" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ height: "100%" }}
          >
            Download All Data
          </Button>
        </CSVLink>
      </Box>
    </React.Fragment>
  );
};
