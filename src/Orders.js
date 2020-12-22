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

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
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

        console.log(status.data.items[0])
        console.log("---object----")
        console.log(obj)
        console.log("---status----")
        console.log(status)
        console.log("---status----")
        console.log("----")

        console.log(status)
        try {
               setPodStatus(status.data.items[0].status.phase);
        } catch (err) {
               setPodStatus("Stop")
        }
    })();

    return (<div>{status}</div>)
}


export default function Orders() {
  const classes = useStyles();
  const [result, setPod] = useState([]);

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
          console.log(result.data)
          console.log(result.data[0].Name)
      })();
  },[]);

  // useEffect(() => {
  //     // pod.status = Getpodstatus("kujiraitest");
  //     console.log("useeffect")
  //     result.map((domain) => {
  //         console.log(domain.Name)
  //         console.log("-----------")
  //         }
  //     )
  // },[]);

    return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((domain) => (
            <TableRow key={domain.id}>
              <TableCell>{domain.CreateDate}</TableCell>
              <TableCell>{domain.Name}</TableCell>
              <TableCell>{domain.Description}</TableCell>
              <TableCell><Getpodstatus name={domain.SubDomainName}/></TableCell>
              {/*<TableCell>{domain.Description}</TableCell>*/}
              <TableCell align="right">{`$${domain.ID}`}</TableCell>
            </TableRow>
          ))}
          {/*<TableRow>*/}
          {/*    <TableCell>Date</TableCell>*/}
          {/*    <TableCell>Name</TableCell>*/}
          {/*    <TableCell>Description</TableCell>*/}
          {/*    <TableCell>Status</TableCell>*/}
          {/*</TableRow>*/}
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
