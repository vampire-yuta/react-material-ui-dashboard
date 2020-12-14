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

export default function Orders() {
  const classes = useStyles();
  const [result, setPod] = useState([]);

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
      // return () => setPod(result);
  })();

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((domain) => (
            <TableRow key={domain.id}>
              <TableCell>{domain.Name}</TableCell>
              <TableCell>{domain.Name}</TableCell>
              <TableCell>{domain.Name}</TableCell>
              <TableCell>{domain.Name}</TableCell>
              <TableCell align="right">{`$${domain.ID}`}</TableCell>
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
