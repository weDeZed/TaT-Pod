import { NavLink, Outlet } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, sm: 76 } }}>
            <Typography component={NavLink} to="/" variant="h5" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '-0.04em', mr: 'auto' }}>
              TaT <Box component="span" sx={{ color: 'text.primary' }}>Pod</Box>
            </Typography>
            <Button component={NavLink} to="/banlist" color="inherit" startIcon={<AutoAwesomeIcon />} sx={{ '&.active': { color: 'primary.main' } }}>
              Ban List
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main"><Outlet /></Box>
    </Box>
  )
}

export default MainLayout