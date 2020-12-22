import * as React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import {useState,useEffect} from "react";
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
  },
}));

function Getpodstatus(props) {
    const [status, setPodStatus] = useState([]);

    console.log(props.name)
    const json = {"Name": props.name};
    const convert_json = JSON.stringify(json);
    const obj = JSON.parse(convert_json);

    (async()=>{

        const request = axios.create({
            baseURL: "http://localhost:1323",
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        })

        const status = await request.post("/getpodstatus", obj);

        // console.log(status.data.items[0])
        // console.log("---object----")
        // console.log(obj)
        // console.log("---status----")
        // console.log(status)
        // console.log("---status----")
        // console.log("----")
        //
        // console.log(status)
        try {
               setPodStatus(status.data.items[0].status.phase);
        } catch (err) {
               setPodStatus("Deleted")
        }
    })();

    return (<div>{status}</div>)
}

function handleClickDelete(props) {
    const json = {"Name":props};
    const convert_json = JSON.stringify(json);
    const obj = JSON.parse(convert_json);
    console.log(obj)

    const request = axios.create({
        baseURL: "http://127.0.0.1:1323",
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'json',
        method: "POST"
    })

    request.post("/delete",obj)
        .then(request => {
            console.log(obj);
        })
        .catch(error => {
            console.log("error")
        })

    alert('https://' + props + '.amelys.jp' + '\nの削除処理が始まりました。')
}

function handleClickUpdateDescription(name,description) {
    console.log("handleclick")
    console.log(name)
    console.log(description)
    const json = {"Name":name,"Description":description};
    const convert_json = JSON.stringify(json);
    const obj = JSON.parse(convert_json);
    console.log(obj)

    const request = axios.create({
        baseURL: "http://127.0.0.1:1323",
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'json',
        method: "POST"
    })

    request.post("/updatedescription",obj)
        .then(request => {
            console.log(obj);
        })
        .catch(error => {
            console.log("error")
        })

    alert(description + '\nの詳細が変更されました。')
}




export default function Orders() {
  const classes = useStyles();
  const [result, setPod] = useState([]);
  const [description, setDescription] = useState()

  useEffect(() => {
      (async()=>{
          //非同期でデータを取得
          const request = axios.create({
              baseURL: "http://127.0.0.1:1323",
              method: "GET"
          })

          const result = await request.get('/getdomains');//Pod一覧を取得

          if(result.data) {
              setPod(result.data);
          }
          // console.log(result.data)
          // console.log(result.data[0].Name)
      })();

  },[]);

    const handleChange = event => {
        setDescription(event.target.value);
        console.log(description)
    };


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
            <TableCell>削除</TableCell>
            <TableCell>詳細編集</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((domain) => (
            <TableRow key={domain.id}>
              <TableCell>{domain.CreateDate}</TableCell>
              <TableCell>{domain.Name}</TableCell>
              <TableCell>
                  {/*<TextareaAutosize className={classes.container}*/}
                  {/*    rowsMax={4}*/}
                  {/*    aria-label="maximum height"*/}
                  {/*    placeholder="Maximum 4 rows"*/}
                  {/*    onChange={handleChange}*/}
                  {/*    defaultValue={domain.Description}*/}
                  {/*    value={description}*/}
                  {/*/>*/}
                  {domain.Description}
                  {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>Open</Button>*/}

                  {/*<Button className={classes.container} variant="contained" color="primary" onClick={() => { handleClickUpdateDescription(domain.SubDomainName,description)}}>保存</Button>*/}
              </TableCell>
              <TableCell><Getpodstatus name={domain.SubDomainName}/></TableCell>
              <TableCell>
                  <Button variant="contained" color="primary" onClick={() => { handleClickDelete(domain.SubDomainName)}}>実行</Button>
              </TableCell>
              <TableCell>
                  <Button variant="contained" color="primary" onClick={() => { handleClickDelete(domain.SubDomainName)}}>実行</Button>
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
    </React.Fragment>
  );
}
