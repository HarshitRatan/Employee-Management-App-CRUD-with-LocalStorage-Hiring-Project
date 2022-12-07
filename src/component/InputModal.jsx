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
import { v4 as uuidv4 } from 'uuid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function InputModal(props) {
    const { open, setOpen, data,
        setData, recordId, firstName, setFirstName,
        lastName, setLastName, email, setEmail,
        phoneNumber, setPhoneNumber, updateFlag, setUpdateFlag } = props;

    const [firstNameError, setFirstNameError] = React.useState(null);
    const [lastNameError, setLastNameError] = React.useState(null);
    const [emailError, setEmailError] = React.useState(null);
    const [phoneNumberError, setPhoneNumberError] = React.useState(null);

    function createData(firstName, lastName, email, phoneNumber) {
        const id = uuidv4();
        return { id, firstName, lastName, email, phoneNumber };
    }
    const setAllStateInitialValue = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setUpdateFlag("");
    }

    const setErrorInitialValue = () => {
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setPhoneNumberError(false);
    }
    const handleClose = () => {
        setOpen(false);
        setAllStateInitialValue();
        setErrorInitialValue();
    }
    const validateEmail = () => {
        const regEmail = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (!email || !regEmail.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }
    const validatePhoneNumber = () => {
        setPhoneNumberError(true);
        if (phoneNumber && phoneNumber.length === 9) {
            setPhoneNumberError(false);
        }
    }

    const handleAddRecord = () => {
        const postData = createData(firstName, lastName, email, phoneNumber);
        if (data.length === 0) {
            setData([postData]);
            localStorage.setItem("empData", JSON.stringify([postData]));
        } else {
            setData([...data, postData]);
            localStorage.setItem("empData", JSON.stringify([...data, postData]));
        }
        Swal.fire(
            'Record has been added successfully !!',
            '',
            'success'
        )
        setOpen(false);
        setAllStateInitialValue();
        setErrorInitialValue();
    }

    const handleUpdateRecord = () => {
        const myData = data.map(x => {
            if (x.id === recordId) {
                return {
                    ...x,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    id: recordId
                }
            }
            return x;
        })
        Swal.fire({
            title: 'Do you want to update the details?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes Update',
            denyButtonText: `Don't Update`,
        }).then((result) => {
            if (result.isConfirmed) {
                setData(myData);
                localStorage.setItem("empData", JSON.stringify(myData));
                Swal.fire('Record has been Updated successfully !!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
        setOpen(false);
        setAllStateInitialValue();
        setErrorInitialValue();
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
                                title={updateFlag ? "Update Employee Details " : "Add New Employee Details"}
                                subheader={new Date().toString().slice(0, 15)}
                            />
                            <CardContent>
                                <TextField
                                    required
                                    margin="normal"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                />
                                {firstNameError && <p style={{ color: 'red' }}>This Field is Required!</p>}
                                <TextField
                                    required
                                    margin="normal"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                />
                                {lastNameError && <p style={{ color: 'red' }}>This Field is Required!</p>}
                                <TextField
                                    required
                                    margin="normal"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        validateEmail();
                                    }}
                                />
                                {emailError && <p style={{ color: 'red' }}>Enter a Valid Email!</p>}
                                <TextField
                                    required
                                    margin="normal"
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        validatePhoneNumber();
                                    }}
                                />
                                {phoneNumberError && <p style={{ color: 'red' }}>Enter a valid Phone number(10 digits only)!</p>}
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
                                    {
                                        updateFlag && (
                                            <Button
                                                disabled={
                                                    !firstName ||
                                                    !lastName ||
                                                    phoneNumberError ||
                                                    !email ||
                                                    emailError
                                                }
                                                variant="contained"
                                                color="success"
                                                sx={{
                                                    fontWeight: '600',
                                                    borderRadius: '10px',
                                                    height: "50px",
                                                    width: "100px"
                                                }}
                                                onClick={handleUpdateRecord}
                                            >
                                                <Stack
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    spacing={2}
                                                    sx={{ width: '100%' }}
                                                >
                                                    <AddTaskIcon sx={{ marginRight: '10px' }} />
                                                    Update
                                                </Stack>
                                            </Button>
                                        )
                                    }
                                    {
                                        !updateFlag && (
                                            <Button
                                                disabled={
                                                    !firstName ||
                                                    !lastName ||
                                                    phoneNumberError ||
                                                    !email ||
                                                    emailError
                                                }
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
                                        )
                                    }
                                </Stack>
                            </CardActions>
                        </Card>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}