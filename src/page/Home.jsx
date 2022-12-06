import React from "react";
import Container from "@mui/material/Container";
import DisplayTable from "../component/DisplayTable";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputModal from "../component/InputModal";
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Swal from "sweetalert2";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [recordId, setRecordId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [updateFlag, setUpdateFlag] = React.useState(false);

  const handleUpdate = (id) => {
    const recordData = data.filter((val) => val.id === id);
    setUpdateFlag(true);
    setRecordId(recordData[0].id);
    setFirstName(recordData[0].firstName);
    setLastName(recordData[0].lastName);
    setEmail(recordData[0].email);
    setPhoneNumber(recordData[0].phoneNumber);
    setOpenModal(true);
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteData = data.filter((val) => val.id !== id);
        setData(deleteData);
        Swal.fire(
          'Deleted!',
          'Record has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <Container sx={{ marginTop: '100px', marginBottom: '50px' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '50px' }}>
        <Typography variant="h4" sx={{ fontWeight: '800', textTransform: 'uppercase' }}>
          Employee Database
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="success"
        sx={{
          fontWeight: '600',
          borderRadius: '10px',
          height: "50px",
          width: "150px",
        }}
        onClick={() => {
          setOpenModal(!openModal)
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <AddIcon sx={{ marginRight: '10px' }} />
          Add new Record
        </Stack>
      </Button>
      {
        data.length === 0 ? (
          <>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                width: '100%',
                marginTop: '20px'
              }}
            >
              <img src="./NoData.png" alt="No Data Found!" />
              <Typography variant="h6" sx={{ fontWeight: '800' }}>
                No Record Found!
              </Typography>
              <Typography variant="button1" sx={{ fontWeight: '600' }}>
                Click On "Add new Record" Button.
              </Typography>
            </Stack>
          </>
        ) : (
          <>
            <DisplayTable
              rows={data}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </>
        )
      }
      <InputModal
        data={data}
        recordId={recordId}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        setData={setData}
        updateFlag={updateFlag}
        setUpdateFlag={setUpdateFlag}
        open={openModal}
        setOpen={setOpenModal}
      />
    </Container>
  );
};

export default Home;
