import React from "react";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "0.5% 0.5%",
    width: "48%",
  },
  formControl: {
    margin: "0.5%",
    minWidth: "99%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
}));

const AddProject = ({ handleCloseDialog }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      fName: "",
      startDate: new Date(),
      priority: "",
      description: "",
    },
    validationSchema: Yup.object({
      fName: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Name is required"),
      startDate: Yup.string().required("Required"),
      priority: Yup.string()
        .oneOf(["high", "medium", "low"], "Invalid Priority level ")
        .required("Priority is required"),
      description: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Description is required"),
    }),

    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        autoFocus
        id="fName"
        label="Name"
        type="text"
        className={classes.textField}
        {...formik.getFieldProps("fName")}
      />
      {formik.touched.fName && formik.errors.fName ? (
        <div className={classes.errorText}>{formik.errors.fName}</div>
      ) : null}

      <MuiPickersUtilsProvider MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Start Date"
          className={classes.textField}
          value={formik.values.startDate}
          onChange={(val) => formik.setFieldValue("startDate", val)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <FormControl className={classes.formControl}>
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          labelId="priority-select-label"
          id="priority-select"
          // value={priority}
          // onChange={handleChange}
          fullWidth
          {...formik.getFieldProps("priority")}
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
        {formik.touched.priority && formik.errors.priority ? (
          <div className={classes.errorText}>{formik.errors.priority}</div>
        ) : null}
      </FormControl>

      <TextField
        margin="dense"
        id="description"
        label="Description"
        multiline
        rowsMax={5}
        fullWidth
        {...formik.getFieldProps("description")}
      />
      {formik.touched.description && formik.errors.description ? (
        <div className={classes.errorText}>{formik.errors.description}</div>
      ) : null}
      <div>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleCloseDialog} color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddProject;
