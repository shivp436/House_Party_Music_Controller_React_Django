import React, { useState, useEffect } from 'react';
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from 'react-router-dom';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';

const HomePage = () => {
    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {
        const fetchUserInRoom = async () => {
            try {
                const response = await fetch('/api/user-in-room');
                const data = await response.json();

                setRoomCode(data.code);
            } catch (error) {
                console.error('Error fetching user in room:', error);
            }
        };

        fetchUserInRoom();
    }, []);

    const RenderHomePage = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        color="primary">
                        <Button color="primary" component={Link} to="/join" style={{ marginRight: '10px'} }>
                            Join a Room
                        </Button>
                        <Button color="secondary" component={Link} to="/create">
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    roomCode ? <Navigate to={`/room/${roomCode}`} /> : <RenderHomePage />
                } />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>
    );
};

export default HomePage;
