import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

import { Modal, Box, createTheme, ThemeProvider } from '@mui/material'
import { grey } from '@mui/material/colors'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: grey[700],
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello World!</h1>
      <div className="card">
        <button onClick={handleOpen}>
          View Message
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Hello again John Doe :)</h2>
          </Box>
        </Modal>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <a href='/task-picker'>
        Click Here to continue to App2
      </a>
      </ThemeProvider>
    </>
  )
}

export default Home
