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

export const Filters = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography
        style={{ paddingTop: "40px" }}
        variant="h5"
        color="textSecondary"
      >
        Filters
      </Typography>
      <Box
        style={{
          // boxShadow: "1px 3px 10px rgb(0 0 0 / 0.2)",
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
          />
          <FormControlLabel
            value="50"
            control={<Radio />}
            label="50"
            labelPlacement="start"
          />
          <FormControlLabel
            value="100"
            control={<Radio />}
            label="100"
            labelPlacement="start"
          />
          <FormControlLabel
            value="All"
            control={<Radio />}
            label="All"
            labelPlacement="start"
          />
        </RadioGroup>
        <Box>
          <FormControl style={{ width: "50%", margin: "10px 0px" }}>
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
              <MenuItem value={22}>Roll No.</MenuItem>
              <MenuItem value={10}>Attendance</MenuItem>
              <MenuItem value={21}>Time Watched</MenuItem>
              <MenuItem value={23}>Chats Score</MenuItem>
              <MenuItem value={24}>Overall Score</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            helperText="Search by Name or Roll No."
            id="demo-helper-text-aligned-no-helper"
            label="Search"
            style={{ width: "50%", margin: "10px 0px" }}
            size="small"
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};
