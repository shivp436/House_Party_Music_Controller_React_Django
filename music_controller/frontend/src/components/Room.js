import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const Room = () => {
    const [roomDetails, setRoomDetails] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });
    const { roomCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getRoomDetails = async () => {
            try {
                const response = await fetch(`/api/get-room?code=${roomCode}`);
                if (!response.ok) {
                    // Handle not found or other error
                    navigate('/');
                    return;
                }
                const data = await response.json();
                setRoomDetails({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            } catch (error) {
                console.error('Error fetching room details:', error);
            }
        };

        getRoomDetails();
    }, [roomCode, navigate]);

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/leave-room', requestOptions).then((_response) => {
            // Perform any cleanup or state changes if needed
            navigate('/');
        });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {roomDetails.votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {roomDetails.guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {roomDetails.isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    );
};

export default Room;
