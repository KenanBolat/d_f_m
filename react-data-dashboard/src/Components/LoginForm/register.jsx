import React, {useState} from "react";
import  axiosInstance from "./axios";
import { useNavigate } from "react-router-dom";

//Material UI

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    paper : {
        marginTop: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignUp() {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: "",
        username: "",
        password: "",
    });
    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance.post("user/create/", {
            email: formData.email,
            name: formData.username,
            password: formData.password,
        })
        .then((res) => {
            navigate("/login");
            console.log(res);
            console.log(res.data);
        });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className="wrapper" noValidate>
                    <Grid container spacing={2} border={""}  >
                            <TextField className="input-box"
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoFocus
                                onChange={handleChange}
                            />
                        <Grid item xs={12}>
                            <TextField className="input-box"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className="input-box"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container>
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
                </form>
        </div>
        </Container>


    );
};

