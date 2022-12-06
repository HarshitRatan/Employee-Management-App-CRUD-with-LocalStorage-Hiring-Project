import React from "react";
import { Button, IconButton, Stack, Container, Box } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Home = () => {
  return (
    <Box sx={{ marginTop: '100px' }}>
      <h1>This is HOME Page</h1>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button variant="contained" component="label">
          Upload
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
      </Stack>
      <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(35)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
