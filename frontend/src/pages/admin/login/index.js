import React, { useState } from "react";

import api from "../../../services/api";
import { login, setIdUser, setNameUser } from "../../../services/auth";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function handleSubmit() {
        await api.post("/api/users/login", { email, password }).then((res) => {
            if (res.status === 200) {
                if (res.data.status === 1) {
                    login(res.data.token);
                    setIdUser(res.data.id_client);
                    setNameUser(res.data.user);

                    window.location.href = "/";
                } else {
                    if (res.data.status === 2) {
                        alert(`Atenção: ${res.data.error}`);
                    }
                }
            } else {
                alert("Erro no servidor");
            }
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Entrar
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
