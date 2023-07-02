import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { fetchAllUserPins, acceptPin, declinePin } from '../redux/adminSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';

const AdminUserPins = () => {
  const userpins = useSelector((state) => state.userpins);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUserPins());
  }, [dispatch]);
  const handleAcceptButton = async (params) => {
    const { _id, userId, username, long, lat, event, place, time, date, desc, images } = params.row;
    try {
      const currentUserPin = userpins.find((pin) => pin._id === params.row._id)
      dispatch(acceptPin(currentUserPin._id));
      dispatch(fetchAllUserPins());
      const res = await axios.post("api/pins", { _id, userId, username, long, lat, event, place, time, desc, images, date });
    } catch (error) {
      console.log(error)
    }
  };
  const handleDeclineButton = async (params) => {
    try {
      const currentUserPin = userpins.find((pin) => pin._id === params.row._id);
      dispatch(declinePin(currentUserPin._id));
      dispatch(fetchAllUserPins());
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Box style={{ marginTop: '50px', marginLeft: '20px', marginRight: '20px' }}>
        <Typography variant="h4" component="h1" align="center">
          User Pins
        </Typography>
        <DataGrid
           columns={[
            { field: "_id", headerName: "pinID", width: 250 },
            { field: "userId", headerName: "userID", width: 250 },
            { field: "username", headerName: "username", width: 250 },
            { field: "event", headerName: "Event", width: 150 },
            { field: "long", headerName: "long", width: 250 },
            { field: "lat", headerName: "lat", width: 150 },
            { field: "place", headerName: "Place", width: 150 },
            { field: "time", headerName: "Time", width: 150 },
            { field: "date", headerName: "Date", width: 150 },
            { field: "desc", headerName: "Additional Info", width: 150 },
            { field: "images", headerName: "Images", width: 150 },
            { field: "createdAt", headerName: "Created At", width: 200 },
            { field: "updatedAt", headerName: "Updated At", width: 200 },
            {
              field: "buttonAccept", 
              headerName: "Accept", 
              width: 150, 
              renderCell: (params) => {
                const currentUserPin = userpins.find((pin) => pin._id === params.row._id)
                if (currentUserPin.accepted === true) {
                  return <Typography style={{color: "green"}}>Accepted</Typography>
                } else {
                  return <Button onClick={() => handleAcceptButton(params)}>Accept</Button>
                }
              },
            },
            {
              field: "buttonDecline", 
              headerName: "Decline", 
              width: 150, 
              renderCell: (params) => {
                const currentUserPin = userpins.find((pin) => pin._id === params.row._id)
                if (currentUserPin.declined === true) {
                  return <Typography style={{color: "red"}}>Declined</Typography>
                } else {
                  return <Button onClick={() => handleDeclineButton(params)}>Decline</Button>
                }
              },
            },
        ]}
          rows={userpins}
          getRowId={(row) => row._id}
        />
      </Box>
    </>
  )
}

export default AdminUserPins