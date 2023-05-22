import {Container, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Button, IconButton, InputAdornment} from "@mui/material";
import React, {useState} from "react";
import Popup from './Popup';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
    heading: {
        color: 'black', textAlign: 'center', fontSize: '25px', textDecoration: 'none', fontWeight: 'bold',
    },
}));

export default function Login() {
    const paperStyle = {paddingBottom: 0, padding: '20px 20px', width: 1000, margin: "20px auto"}
    const [userEmailText, setUserEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const [popup, setPopup] = useState(false)
    const classes = useStyles();

    const handleLogin = async (e) => {
        e.preventDefault()

        const data = {
            "userEmail": userEmailText, "password": passwordText
        }

        try {
            await axios.post('http://localhost:5424/user/login', data)
                .then(response => {
                    setUserId(response.data.data[0].userId)
                    setUserName(response.data.data[0].userName)
                    setUserEmail(response.data.data[0].userEmail)
                    setPassword(response.data.data[0].password)
                    handleSetDataInStorage(response.data.data[0].userId, response.data.data[0].userName, response.data.data[0].userEmail, response.data.data[0].password)
                })
        } catch (error) {
            setPopup(true)
            setErrorMessages(error.response.data.messages.map((message) => (<div>{message.messages}</div>)));
            console.log(errorMessages);
        }
    }

    function handleSetDataInStorage(userId, userName, userEmail, password) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('password', password);
        window.location.href = 'http://localhost:3000/home';
    }

    const handleNavigateToRegister = async (e) => {
        e.preventDefault()

        window.location.href = 'http://localhost:3000/register';
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (<Container>
        <Paper elevation={3} style={paperStyle}>
            <Typography variant="h2" className={classes.heading}>Login</Typography>
            <br/>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth
                           value={userEmailText}
                           onChange={(e) => setUserEmailText(e.target.value)}
                />
                <br/><br/>
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
                           type={showPassword ? "text" : "password"}
                           value={passwordText}
                           onChange={(e) => setPasswordText(e.target.value)}
                           InputProps={{
                               endAdornment: (<InputAdornment position="end">
                                       <IconButton onClick={handleClickShowPassword} edge="end"/>
                                   </InputAdornment>)
                           }}
                />
                <br/><br/>
                <Button variant="contained" color="secondary" onClick={handleLogin} fullWidth>
                    Login
                </Button>
                <br/><br/>
                <Button variant="contained" color="secondary" onClick={handleNavigateToRegister} fullWidth>
                    Register
                </Button>
                <Popup trigger={popup} setTrigger={setPopup}>
                    <br/>
                    <label>{errorMessages}</label>
                </Popup>
                <br/>
                <br/>
            </form>
        </Paper>
    </Container>)
}
