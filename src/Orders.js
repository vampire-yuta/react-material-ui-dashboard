import * as React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
}));

function Getpodstatus(props) {
  const [status, setPodStatus] = useState([]);

  console.log(props.name);
  const json = { Name: props.name };
  const convert_json = JSON.stringify(json);
  const obj = JSON.parse(convert_json);

  (async () => {
    const request = axios.create({
      baseURL: "http://localhost:1323",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });

    const status = await request.post("/getpodstatus", obj);

    try {
      setPodStatus(status.data.items[0].status.phase);
    } catch (err) {
      setPodStatus("Deleted");
    }
  })();

  return <div>{status}</div>;
}

// function handleClickDelete(props) {
//   const json = { Name: props };
//   const convert_json = JSON.stringify(json);
//   const obj = JSON.parse(convert_json);
//   console.log(obj);
//
//   const request = axios.create({
//     baseURL: "http://127.0.0.1:1323",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     responseType: "json",
//     method: "POST",
//   });
//
//   request
//     .post("/delete", obj)
//     .then((request) => {
//       console.log(obj);
//     })
//     .catch((error) => {
//       console.log("error");
//     });
//
//   alert("https://" + props + ".amelys.jp\nの削除処理が始まりました。");
// }

function GetBranch() {
  // const [branches, setBranchesName] = useState({Name:"",Branch:""});
  const defaultList = [
    { Name: "A", Branch: "branch1" },
    { Name: "B", Branch: "branch2" },
    { Name: "C", Branch: "branch3" },
  ];
  const [branches, setBranchesName] = useState(defaultList);

  useEffect(() => {
    (async () => {
      const request = axios.create({
        baseURL: "http://127.0.0.1:1323",
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
        method: "GET",
      });

      const branches = await request.get("/getbranch");
      console.log(branches.data[0].Name);
      console.log(branches.data[0].Branch);
      console.log(branches.data);
      console.log(branches.data[0].Name);
      try {
        setBranchesName(branches.data);
      } catch (err) {
        setBranchesName("---");
      }
    })();
  }, []);

  console.log("--------");
  console.log(branches);
  console.log(branches[0]);
  console.log("--------");

  return (
    <div>
      {branches.map((b) => (
        <div>
          <strong>{b.Name}:</strong>{b.Branch}
        </div>
      ))}
    </div>
  );
}

export default function Orders() {
  const classes = useStyles();
  const [result, setPod] = useState([]);
  const [isrefresh, setIsrefresh] = useState(false);
  const [desc, setDesc] = useState({ Name: "", Description: "" });
  const [open, setOpen] = useState(false);

  const handleClickOpen = (name, description) => {
    setOpen(true);
    const json = { Name: name, Description: description };
    const convert_json = JSON.stringify(json);
    const obj = JSON.parse(convert_json);
    setDesc(obj);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      //非同期でデータを取得
      const request = axios.create({
        baseURL: "http://127.0.0.1:1323",
        method: "GET",
      });

      const result = await request.get("/getdomains"); //Pod一覧を取得

      console.log("===========");
      console.log(result.data);
      if (result.data) {
        setPod(result.data);
      }
      console.log(result.data);
    })();
  }, []);

  useEffect(() => {
    if (isrefresh) {
      (async () => {
        //非同期でデータを取得
        const request = axios.create({
          baseURL: "http://127.0.0.1:1323",
          method: "GET",
        });

        const result = await request.get("/getdomains"); //Pod一覧を取得

        console.log("===========");
        console.log(result.data);
        if (result.data) {
          setPod(result.data);
          setIsrefresh(false);
        }

        console.log(result.data);
      })();
    }
  }, [isrefresh]);

  const handleChange = (event) => {
    setDesc({ Name: desc.Name, Description: event.target.value });
    console.log(desc.Description);
    console.log(desc.Name);
  };

  const handleClickUpdateDescription = (name, description) => {
    console.log(name);
    console.log(description);
    const json = { Name: name, Description: description };
    const convert_json = JSON.stringify(json);
    const obj = JSON.parse(convert_json);

    const request = axios.create({
      baseURL: "http://127.0.0.1:1323",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
      method: "POST",
    });

    request
      .post("/updatedescription", obj)
      .then((request) => {
        console.log(obj);
        setIsrefresh(true);
        handleClose();
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleClickDelete = (props) => {
    const json = { Name: props };
    const convert_json = JSON.stringify(json);
    const obj = JSON.parse(convert_json);
    console.log(obj);

    const request = axios.create({
      baseURL: "http://127.0.0.1:1323",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
      method: "POST",
    });

    request
        .post("/delete", obj)
        .then((request) => {
          console.log(obj);
          setIsrefresh(true);
          handleClose();
        })
        .catch((error) => {
          console.log("error");
        });

    alert("https://" + props + ".amelys.jp\nの削除処理が始まりました。");
  }

  return (
    <React.Fragment>
      <Title>サービス状態</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>作成日</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>説明</TableCell>
            <TableCell>状態</TableCell>
            <TableCell>詳細</TableCell>
            <TableCell>削除</TableCell>
            <TableCell>詳細編集</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((domain) => (
            <TableRow key={domain.id}>
              <TableCell>{domain.CreateDate}</TableCell>
              <TableCell>{domain.Name}</TableCell>
              <TableCell>{domain.Description}</TableCell>
              <TableCell>
                <Getpodstatus name={domain.SubDomainName} />
              </TableCell>
              <TableCell>
                <GetBranch />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClickDelete(domain.SubDomainName);
                  }}
                >
                  実行
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClickOpen(domain.SubDomainName, domain.Description);
                  }}
                >
                  実行
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">説明</DialogTitle>
        <DialogContent>
          <DialogContentText>説明を入力してください。</DialogContentText>
          <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue=""
            variant="filled"
            fullWidth
            value={desc.Description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              handleClickUpdateDescription(desc.Name, desc.Description, open);
            }}
            color="primary"
          >
            適用
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
