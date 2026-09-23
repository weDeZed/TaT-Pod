import { Box, Button, Container, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 10, md: 18 }, maxWidth: 760 }}>
        <Typography variant="overline" color="primary.main" sx={{ letterSpacing: '0.2em', fontWeight: 700 }}>Magic: The Gathering · TaT Pod</Typography>
        <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: '3.2rem', md: '5.5rem' }, lineHeight: 0.98 }}>The table is set.</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 3, maxWidth: 540, lineHeight: 1.6, fontWeight: 400 }}>L&apos;espace de jeu de notre pod, bientôt rempli de decks, de parties et de petites décisions discutables.</Typography>
        <Stack direction="row" sx={{ mt: 5 }}><Button component={Link} to="/banlist" variant="contained" endIcon={<ArrowForwardIcon />}>Consulter la Ban List</Button></Stack>
      </Box>
    </Container>
  )
}

export default HomePage