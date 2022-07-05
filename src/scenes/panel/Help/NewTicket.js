import { Grid, List, ListItem, ListItemButton, Typography, Alert, Skeleton, Avatar, Card, CardHeader, CardContent, TextField, } from '@mui/material';
import { LoadingButton } from '@mui/lab'


const NewTicket = () => {
    return <Card>
        <CardHeader subheader="New Ticket" />
        <CardContent>
            <TextField
                label="Subject"
                variant="standard"
                sx={{ marginBottom: (theme) => theme.spacing(2) }}
                type="text"
                fullWidth
            // value={first_name}
            // onChange={(e) => { setFirstName(e.target.value) }}
            // disabled={disabled}
            />

            <TextField
                label="Last name"
                variant="standard"
                sx={{ marginBottom: (theme) => theme.spacing(2) }}
                type="text"
                fullWidth
            // value={last_name}
            // onChange={(e) => { setLastName(e.target.value) }}
            // disabled={disabled}
            />

            <TextField
                label="Username"
                variant="standard"
                sx={{ marginBottom: (theme) => theme.spacing(2) }}
                type="text"
                fullWidth
            // value={username}
            // onChange={(e) => { setUsername(e.target.value) }}
            // disabled={disabled || true}
            />


            <TextField
                label="Email"
                variant="standard"
                sx={{ marginBottom: (theme) => theme.spacing(2) }}
                type="text"
                fullWidth
            // value={email}
            // onChange={(e) => { setEmail(e.target.value) }}
            // disabled={disabled || true}
            />

            <LoadingButton
                variant="contained"
                size="large"
                children="Edit"
            // onClick={submit}
            // disabled={disabled}
            // loading={loading}
            />


        </CardContent>
    </Card>
}

export default NewTicket