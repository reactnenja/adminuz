import { Link, useNavigate } from "react-router-dom";
import "./Add.scss";
// import { useState } from "react";
import axios from "axios";
import { Button, MenuItem, TextField } from "@mui/material";
import { GroupAdd, KeyboardBackspace } from "@mui/icons-material";
import { useFormik } from "formik";
const AddTeacher = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      group: "",
      age: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.firstName === "") {
        errors.firstName = "First Name is required !!!";
      }
      if (values.lastName === "") {
        errors.lastName = "Last Name is required !!!";
      }
      if (values.group === "") {
        errors.group = "Group is required !!!";
      }
      if (values.age === "") {
        errors.age = "Age is required !!! ";
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (values.firstName.length > 3 && values.lastName.length > 0) {
        try {
          await axios.post("http://localhost:3000/teacher", values);

          navigate("/");
        } catch (error) {
          console.log(error.message, "hatolik bor");
        }
      } else {
        alert("Please fill in your information before 😜😜😜");
      }
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  return (
    <div className="add">
      <div className="container">
        <div className="add_head">
          <Link to="/">
            <Button color="success" variant="contained">
              <KeyboardBackspace sx={{ fontSize: "35px" }} />
            </Button>
          </Link>
          <span>Add Teacher</span>
        </div>
        <form
          className="add_body"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="add_info">
            <div className="input">
              <TextField
                label="First Name"
                onChange={handleChange}
                name="firstName"
                type="text"
                size="medium"
                sx={{ width: "300px" }}
                value={values.firstName}
                onBlur={handleBlur}
                id="firstName"
              />
              <span className="err">
                {touched.firstName && errors.firstName && errors.firstName}
              </span>
            </div>
            <div className="input">
              <TextField
                label="Last Name"
                onChange={handleChange}
                name="lastName"
                type="text"
                id="lastName"
                size="medium"
                sx={{ width: "300px" }}
                value={values.lastName}
                onBlur={handleBlur}
              />
              <span className="err">
                {touched.lastName && errors.lastName && errors.lastName}
              </span>
            </div>
            <div className="input">
              <TextField
                label="Age"
                onChange={handleChange}
                name="age"
                type="number"
                id="age"
                size="medium"
                sx={{ width: "300px" }}
                value={values.age}
                onBlur={handleBlur}
              />
              <span className="err">
                {touched.age && errors.age && errors.age}
              </span>
            </div>
            <div className="input">
              <TextField
                select
                label="Level"
                onChange={handleChange}
                name="group"
                size="medium"
                value={values.group}
                sx={{ width: "300px" }}
                onBlur={handleBlur}
                id="group"
              >
                <MenuItem value="junior">Junior</MenuItem>
                <MenuItem value="middle">Middle</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
              </TextField>
              <span className="err">
                {touched.group && errors.group && errors.group}
              </span>
            </div>
          </div>
          <div className="btn">
            <Button type="submit" variant="contained" color="success">
              <GroupAdd sx={{ fontSize: "40px" }} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
