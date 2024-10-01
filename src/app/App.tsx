import React from 'react';
import '../css/app.css';
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { RippleBadge } from './MaterialTheme/styled';

function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{my: 5}}>
            <Typography variant='h4' component={"h4"}>
              Create React App on TypeScript with REDUX
            </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}>
            <Button variant="contained">Contained</Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
