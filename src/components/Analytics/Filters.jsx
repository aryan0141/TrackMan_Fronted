// import { Box } from "@mui/system";
// import React from "react";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import {
//   FormControl,
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";

// export const Filters = () => {
//   const [age, setAge] = React.useState("");

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };
//   return (
//     <React.Fragment>
//       <Typography
//         style={{ paddingTop: "20px" }}
//         variant="h5"
//         color="textSecondary"
//       >
//         Filters
//       </Typography>
//       <Box
//         style={{
//           // boxShadow: "1px 3px 10px rgb(0 0 0 / 0.2)",
//           border: "1px solid #a9a9a9",
//           borderRadius: "3px",
//           padding: "20px",
//         }}
//       >
//         <RadioGroup
//           row
//           aria-labelledby="demo-form-control-label-placement"
//           name="position"
//           style={{ marginLeft: "-15px" }}
//           // defaultValue="All"
//         >
//           <FormControlLabel
//             value="10"
//             control={<Radio />}
//             label="10"
//             labelPlacement="start"
//           />
//           <FormControlLabel
//             value="50"
//             control={<Radio />}
//             label="50"
//             labelPlacement="start"
//           />
//           <FormControlLabel
//             value="100"
//             control={<Radio />}
//             label="100"
//             labelPlacement="start"
//           />
//           <FormControlLabel
//             value="All"
//             control={<Radio />}
//             label="All"
//             labelPlacement="start"
//           />
//         </RadioGroup>
//         <Box>
//           <FormControl style={{ width: "50%", margin: "10px 0px" }}>
//             <InputLabel id="demo-simple-select-autowidth-label" size="small">
//               Sort By
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-autowidth-label"
//               id="demo-simple-select-autowidth"
//               value={age}
//               onChange={handleChange}
//               autoWidth
//               label="Sort by"
//               size="small"
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               <MenuItem value={22}>Roll No.</MenuItem>
//               <MenuItem value={10}>Attendance</MenuItem>
//               <MenuItem value={21}>Time Watched</MenuItem>
//               <MenuItem value={23}>Chats Score</MenuItem>
//               <MenuItem value={24}>Overall Score</MenuItem>
//             </Select>
//           </FormControl>
//           <br />
//           <TextField
//             helperText="Search by Name or Roll No."
//             id="demo-helper-text-aligned-no-helper"
//             label="Search"
//             style={{ width: "50%", margin: "10px 0px" }}
//             size="small"
//           />
//         </Box>
//       </Box>
//     </React.Fragment>
//   );
// };


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

export const Filters = (props) => {
  const [age, setAge] = React.useState("");
  // const [search, setSearch] = React.useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    setAge(value);
    // if(value === "attendance") {
    //   const sortedData = props.data.sort((a, b) => (a.classesAttended < b.classesAttended) ? 1 : (a.classesAttended === b.classesAttended) ? ((a.size > b.size) ? 1 : -1) : -1 );
    //   props.onChange(sortedData);
    // } else if(value === "mins_watched") {
    //   const sortedData = props.data.sort((a, b) => (a.duration < b.duration) ? 1 : (a.duration === b.duration) ? ((a.size > b.size) ? 1 : -1) : -1 );
    //   console.log("SortedData", sortedData);
    //   props.onChange(sortedData);
    // } else if(value === "comments") {
    //   const sortedData = props.data.sort((a, b) => (a.comments < b.comments) ? 1 : (a.comments === b.comments) ? ((a.size > b.size) ? 1 : -1) : -1 );
    //   props.onChange(sortedData);
    // }
  };

  function sortData(value) {
    if(value === "attendance") {
      const sortedData = props.data.sort((a, b) => (a.classesAttended < b.classesAttended) ? 1 : (a.classesAttended === b.classesAttended) ? ((a.size > b.size) ? 1 : -1) : -1 );
      props.onChange(sortedData);
    } else if(value === "mins_watched") {
      console.log("Andar aaya hun!");
      const sortedData = props.data.sort((a, b) => (a.duration < b.duration) ? 1 : (a.duration === b.duration) ? ((a.size > b.size) ? 1 : -1) : -1 );
      console.log("SortedData", sortedData);
      props.onChange(sortedData);
    } else if(value === "comments") {
      const sortedData = props.data.sort((a, b) => (a.comments < b.comments) ? 1 : (a.comments === b.comments) ? ((a.size > b.size) ? 1 : -1) : -1 );
      props.onChange(sortedData);
    }
  }

  function cropData(value) {
    if(props.data.length >= parseInt(value)) {
      props.onChange(props.data.slice(0, parseInt(value)));
    } else {
      props.onChange(props.data);
    }
    // console.log(data);   
  }

  // function searchData(value) {
  //   setSearch(value);
  //   props.data.map((element, index) => {
  //     if (element.name.toLowerCase().includes(value.toLowerCase())) {
  //         console.log(element);
  //     } else {
  //       props.data.splice(index, 1);
  //       console.log(props.data);
  //     }
  //   });
  //   props.onChange(props.data);
  // }

  return (
    <React.Fragment>
      <Typography
        style={{ paddingTop: "20px" }}
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
            value="1"
            control={<Radio />}
            label="1"
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
              {/* <MenuItem value={22}>Roll No.</MenuItem> */}
              <MenuItem value={"attendance"} onClick={(e) => sortData(e.target.value)}>Attendance</MenuItem>
              <MenuItem value={"mins_watched"} onClick={(e) => sortData(e.target.value)}>Time Watched</MenuItem>
              <MenuItem value={"comments"} onClick={(e) => sortData(e.target.value)}>Chat Score</MenuItem>
              {/* <MenuItem value={24}>Overall Score</MenuItem> */}
            </Select>
          </FormControl>
          <br />
          {/* <TextField
            helperText="Search by Name or Roll No."
            id="demo-helper-text-aligned-no-helper"
            label="Search"
            value={search}
            onChange={(e) => searchData(e.target.value)}
            style={{ width: "50%", margin: "10px 0px" }}
            size="small"
          /> */}
        </Box>
      </Box>
    </React.Fragment>
  );
};