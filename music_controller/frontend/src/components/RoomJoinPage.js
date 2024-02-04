import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const RoomJoinPage = () => {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
        setError('');
    };

    const roomButtonPressed = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: roomCode,
                }),
            };

            const response = await fetch('/api/join-room', requestOptions);

            if (response.ok) {
                navigate(`/room/${roomCode}`);
            } else {
                setError('Room not found.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    error={Boolean(error)}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/"
                    style={{ marginRight: '8px' }}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/create">
                    Create a Room
                </Button>
            </Grid>
        </Grid>
    );
};

export default RoomJoinPage;
