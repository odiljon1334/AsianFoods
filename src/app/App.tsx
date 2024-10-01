import React from 'react';
import '../css/app.css';
import { Container, Stack, Box, Typography, Button } from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{my: 5}}>
            <Typography variant='h4' component={"h4"}>
              Create React App on TypeScript with REDUX
            </Typography>
        </Box>
        <Button variant="contained">Contained</Button>
      </Stack>
    </Container>
  );
}

export default App;
