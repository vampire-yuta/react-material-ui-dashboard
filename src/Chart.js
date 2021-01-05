import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Chart() {
  const classes = useStyles();
  const [values, setValues] = useState();

  function handleClickStart(props) {
    const json = { Name: values, Description: "test" };
    const convert_json = JSON.stringify(json);
    const obj = JSON.parse(convert_json);
    console.log(obj);
    console.log(values);

    const request = axios.create({
      baseURL: "http://127.0.0.1:1323",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
      method: "POST",
    });
    request
      .post("/domains", obj)
      .then((request) => {
        console.log(obj);
      })
      .catch((error) => {
        console.log("error");
      });

    alert(
      "https://" +
        values +
        ".amelys.jp" +
        "\nのドメインで作成されました。" +
        "\n30分ほどお待ちください。"
    );
  }

  const handleChange = (event) => {
    setValues(event.target.value);
    console.log(values);
  };

  return (
    <React.Fragment>
      <Title>Today</Title>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Standard"
          onChange={handleChange}
          value={values}
        />
      </form>
      <ResponsiveContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleClickStart(values);
          }}
        >
          Deploy
        </Button>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
