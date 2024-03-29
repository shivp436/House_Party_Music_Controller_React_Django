import React, { useState } from 'react';
import {
    Grid,
    Typography,
    FormControl,
    FormHelperText,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const CreateRoomPage = () => {
    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

    const navigate = useNavigate();

    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    };

    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === 'true');
    };

    const handleRoomButtonPressed = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    votes_to_skip: votesToSkip,
                    guest_can_pause: guestCanPause,
                }),
            };

            const response = await fetch('/api/create-room', requestOptions);
            const data = await response.json();

            navigate(`/room/${data.code}`);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup
                        row
                        defaultValue="true"
                        onChange={handleGuestCanPauseChange}>
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required
                        type="number"
                        onChange={handleVotesChange}
                        defaultValue={defaultVotes}
                        inputProps={{
                            min: 1,
                            style: { textAlign: 'center' },
                        }}
                    />
                    <FormHelperText>
                        <div align="center">Votes Required To Skip Song</div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleRoomButtonPressed}>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to="/"
                    style={{ marginRight: '8px' }}>
                    Back
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to="/join">
                    Join existing Room
                </Button>
            </Grid>
        </Grid>
    );
};

export default CreateRoomPage;
