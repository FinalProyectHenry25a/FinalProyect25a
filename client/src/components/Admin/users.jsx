import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  banUser,
  getAllUsers,
  getUser,
  unbanUser,
  usersAdmin,
} from "../../Actions";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import style from "./../Admin/Admin.module.css";

export default function Users() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { email } = useParams();

  const users = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    userVerificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser === null) {
        history.push("/home");
      }

      try {
        let info = await dispatch(getUser(currentUser.email));

        if (!info.payload.isAdmin || info.payload.banned) {
          history.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  async function deleteUsers(email) {
    try {
      await axios.delete(`http://localhost:3001/admin/users/${email}`);
      alert("usuario eliminado");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function Row(props) {
    
    const { row } = props;
  console.log(row)
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              width="1%"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center" width="12%">{row.email}</TableCell>
          <TableCell align="center" width="12%">{row.username}</TableCell>
          <TableCell align="center" width="12%">{row.firstname}</TableCell>
          <TableCell align="center" width="12%">{row.lastname}</TableCell>
          <TableCell align="center" width="12%">{row.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Historial
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Fecha</TableCell>
                      <TableCell align="center">Producto</TableCell>
                      <TableCell align="center">Monto</TableCell>
                      <TableCell align="center">Precio Total ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.shopping?.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.brand}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width="1%"/>
            <TableCell align="center" width="12%">Email</TableCell>
            <TableCell align="center" width="12%">Username</TableCell>
            <TableCell align="center" width="12%">Firstname</TableCell>
            <TableCell align="center" width="12%">Lastname</TableCell>
            <TableCell align="center" width="12%">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <Row key={row.email} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
{
  /* <Link to="/home">
            <button className={style.btn}>Volver</button>
          </Link>
          <h1 className="d-flex justify-content-center align-items-center">Usuarios</h1>
    
          <br />
          <br />
    
          {users?.map((el) => {
            return (
              <div className=" d-flex justify-content-center align-items-center mt-4">
            <div className=" border rounded w-75" key={el.email}>
              <h6 className="mt-2  d-flex justify-content-center align-items-center" >
                {el.email} - {el.username} 
              </h6>
              <div className=" d-flex justify-content-center align-items-center mt-3 mb-2">
              <button className="btn btn-danger me-2" onClick={() => deleteUsers(el.email)}>Eliminar</button>
              {el.banned ? <button className="btn btn-secondary" onClick={() => dispatch(unbanUser(el.email))}>Desbanear</button> : <button  className="btn btn-danger" onClick={() => dispatch(banUser(el.email))}>Banear</button>}
            </div>
            </div>
            </div>
            )
            })} */
}
