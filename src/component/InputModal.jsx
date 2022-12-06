import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from "sweetalert2";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function InputModal(props) {
    const { open, setOpen, data, setData } = props;
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    function createData(firstName, lastName, email, phoneNumber) {
        return { firstName, lastName, email, phoneNumber };
    }
    const setAllStateInitialValue = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
    }
    const handleClose = () => setOpen(false);

    const handleAddRecord = () => {
        const postData = createData(firstName, lastName, email, phoneNumber);
        if (data.length === 0) {
            setData([postData]);
        } else {
            setData([...data, postData]);
        }
        Swal.fire(
            'Record has been added successfully !!',
            '',
            'success'
        )
        setOpen(false);
        setAllStateInitialValue();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Card sx={{ width: '100%', padding: 2 }}>
                            <CardHeader
                                title="Add New Employee Details"
                                subheader={new Date().toString().slice(0, 15)}
                            />
                            <CardContent>
                                <TextField
                                    margin="normal"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </CardContent>
                            <CardActions disableSpacing>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ width: '100%' }}
                                >
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{
                                            fontWeight: '600',
                                            borderRadius: '10px',
                                            height: "50px",
                                            width: "100px",
                                        }}
                                        onClick={handleClose}
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{ width: '100%' }}
                                        >
                                            <CancelIcon sx={{ marginRight: '10px' }} />
                                            Close
                                        </Stack>
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{
                                            fontWeight: '600',
                                            borderRadius: '10px',
                                            height: "50px",
                                            width: "100px"
                                        }}
                                        onClick={handleAddRecord}
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{ width: '100%' }}
                                        >
                                            <AddTaskIcon sx={{ marginRight: '10px' }} />
                                            Add
                                        </Stack>
                                    </Button>
                                </Stack>
                            </CardActions>
                        </Card>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}