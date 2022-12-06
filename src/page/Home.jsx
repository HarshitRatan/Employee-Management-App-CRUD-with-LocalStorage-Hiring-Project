import React from "react";
import Container from "@mui/material/Container";
import DisplayTable from "../component/DisplayTable";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputModal from "../component/InputModal";
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

const Home = () => {
  const [data, setData] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);

  const handleUpdate = (phoneNumber) => {
    console.log("Update user Ph with :: ", phoneNumber);
  }

  const handleDelete = (phoneNumber) => {
    console.log("Delete user Ph with :: ", phoneNumber);
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
        onClick={() => setOpenModal(!openModal)}
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
        setData={setData}
        open={openModal}
        setOpen={setOpenModal}
      />
    </Container>
  );
};

export default Home;
