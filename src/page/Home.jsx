import React from "react";
import Container from "@mui/material/Container";
import DisplayTable from "../component/DisplayTable";

const Home = () => {
  const [data, setData] = React.useState([]);

  function createData(firstName, lastName, email, phoneNumber) {
    return { firstName, lastName, email, phoneNumber };
  }

  const handleUpdate = (phoneNumber) => {
    console.log("Update user Ph with :: ", phoneNumber);
  }
  const handleDelete = (phoneNumber) => {
    console.log("Delete user Ph with :: ", phoneNumber);
  }

  React.useEffect(() => {
    const tempData = [
      createData('harshit', 'shukla', 'harshit.shukla@gmail.com', '123455456450'),
      createData('Shreya', 'Singh', 'shreya.singh@gmail.com', '9415093948'),
      createData('deepak', 'verma', 'deepak.verma@gmail.com', '8726916679'),
      createData('Rahul', 'Mishra', 'rahul.mishra@gmail.com', '4521456398'),
    ];
    setData(tempData);
  }, [])

  return (
    <Container sx={{ marginTop: '100px', marginBottom: '50px', border: '2px solid red' }}>
      
      <DisplayTable rows={data} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </Container>
  );
};

export default Home;
