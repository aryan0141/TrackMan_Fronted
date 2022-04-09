import { Box } from "@mui/system";
import React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import { ExportData } from "./ExportData";

export const Filters = (props) => {
  const [age, setAge] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setAge(value);
    if (value === "attendance") {
      const sortedData = props.studentsData.sort((a, b) =>
        a.classesAttended < b.classesAttended
          ? 1
          : a.classesAttended === b.classesAttended
          ? a.size > b.size
            ? 1
            : -1
          : -1
      );
      props.onChange(sortedData, searchQuery);
    } else if (value === "mins_watched") {
      const sortedData = props.studentsData.sort((a, b) =>
        a.duration < b.duration
          ? 1
          : a.duration === b.duration
          ? a.size > b.size
            ? 1
            : -1
          : -1
      );
      props.onChange(sortedData, searchQuery);
    } else if (value === "comments") {
      const sortedData = props.studentsData.sort((a, b) =>
        a.comments < b.comments
          ? 1
          : a.comments === b.comments
          ? a.size > b.size
            ? 1
            : -1
          : -1
      );
      props.onChange(sortedData, searchQuery);
    } else if (value === "name") {
      const sortedData = props.studentsData.sort((a, b) =>
        a.name > b.name
          ? 1
          : a.name === b.name
          ? a.size > b.size
            ? 1
            : -1
          : -1
      );
      props.onChange(sortedData, searchQuery);
    } else if (value === "overallScore") {
      const sortedData = props.studentsData.sort((a, b) =>
        a.overallScore < b.overallScore
          ? 1
          : a.overallScore === b.overallScore
          ? a.size > b.size
            ? 1
            : -1
          : -1
      );
      props.onChange(sortedData, searchQuery);
    }
  };

  function cropData(value) {
    if (props.data.length >= parseInt(value)) {
      props.onChange(props.data.slice(0, parseInt(value)), searchQuery);
    } else {
      props.onChange(props.data, searchQuery);
    }
  }

  function searchData(value) {
    setSearchQuery(value);
    console.log(searchQuery);
    props.onChange(props.studentsData, value);
  }

  return (
    <React.Fragment>
      <Box
        style={{
          border: "1px solid #a9a9a9",
          borderRadius: "3px",
          padding: "20px",
        }}
      >
        <RadioGroup
          row
          aria-labelledby="demo-form-control-label-placement"
          name="position"
          style={{ marginLeft: "-15px" }}
          // defaultValue="All"
        >
          <FormControlLabel
            value="10"
            control={<Radio />}
            label="10"
            labelPlacement="start"
            onChange={(e) => cropData(e.target.value)}
          />
          <FormControlLabel
            value="50"
            control={<Radio />}
            label="50"
            labelPlacement="start"
            onChange={(e) => cropData(e.target.value)}
          />
          <FormControlLabel
            value="100"
            control={<Radio />}
            label="100"
            labelPlacement="start"
            onChange={(e) => cropData(e.target.value)}
          />
          <FormControlLabel
            value="All"
            control={<Radio />}
            label="All"
            labelPlacement="start"
            onChange={(e) => cropData(e.target.value)}
          />
        </RadioGroup>
        <Grid container spacing={2}>
          <Grid item xlg={6} lg={6} md={6} sm={12}>
            <TextField
              style={{ width: "100%", margin: "10px 0px" }}
              helperText="Search by Name or Roll No."
              id="demo-helper-text-aligned-no-helper"
              label="Search"
              value={searchQuery}
              onChange={(e) => searchData(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xlg={6} lg={6} md={6} sm={12}>
            <FormControl style={{ width: "100%", margin: "10px 0px" }}>
              <InputLabel id="demo-simple-select-autowidth-label" size="small">
                Sort By
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleChange}
                autoWidth
                label="Sort by"
                size="small"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"overallScore"}>Overall Score</MenuItem>
                <MenuItem value={"attendance"}>Attendance</MenuItem>
                <MenuItem value={"mins_watched"}>Time Watched</MenuItem>
                <MenuItem value={"comments"}>Chat Score</MenuItem>
                {/* <MenuItem value={24}>Overall Score</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <ExportData studentsData={props.studentsData} classroomDetails={props.classroomDetails} />
      </Box>
    </React.Fragment>
  );
};
