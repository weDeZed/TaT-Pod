import { useEffect, useState } from 'react'
import { Alert, Box, Card, CardActionArea, CardMedia, CircularProgress, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import banlist from '../data/banlist.json'

function getCardImage(card) {
  return card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal
}

function BanlistPage() {
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function fetchBannedCards() {
      try {
        const response = await fetch('https://api.scryfall.com/cards/collection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifiers: banlist.map((name) => ({ name })) }),
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('La réponse de Scryfall est indisponible.')
        const data = await response.json()
        setCards(data.data ?? [])
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }
    fetchBannedCards()
    return () => controller.abort()
  }, [])

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="overline" color="primary.main" sx={{ letterSpacing: '0.18em', fontWeight: 700 }}>Rules of engagement</Typography>
        <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '2.5rem', md: '4rem' } }}>Ban List</Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 600 }}>Les cartes qui restent dans le classeur. Cliquez sur une carte pour inspecter ses détails.</Typography>
      </Box>
      {isLoading && <Stack alignItems="center" sx={{ py: 12 }}><CircularProgress color="primary" /></Stack>}
      {error && <Alert severity="error">Impossible de charger la Ban List : {error}</Alert>}
      {!isLoading && !error && <Grid container spacing={{ xs: 2, sm: 3 }}>
        {cards.map((card) => <Grid key={card.id} size={{ xs: 6, sm: 4, md: 3 }}>
          <Card sx={{ overflow: 'hidden', transition: 'transform 180ms ease, box-shadow 180ms ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 30px rgba(59, 226, 179, 0.28)' } }}>
            <CardActionArea onClick={() => setSelectedCard(card)}>
              <CardMedia component="img" image={getCardImage(card)} alt={card.name} sx={{ aspectRatio: '0.718', objectFit: 'cover' }} />
            </CardActionArea>
          </Card>
        </Grid>)}
      </Grid>}
      <Dialog open={Boolean(selectedCard)} onClose={() => setSelectedCard(null)} fullWidth maxWidth="sm">
        {selectedCard && <>
          <DialogTitle sx={{ pr: 7 }}>{selectedCard.name}<IconButton aria-label="Fermer" onClick={() => setSelectedCard(null)} sx={{ position: 'absolute', right: 12, top: 12 }}><CloseIcon /></IconButton></DialogTitle>
          <DialogContent dividers><Stack spacing={1.5}>
            <Typography><strong>Coût de mana :</strong> {selectedCard.mana_cost || selectedCard.card_faces?.[0]?.mana_cost || 'N/A'}</Typography>
            <Typography><strong>Ligne de type :</strong> {selectedCard.type_line}</Typography>
            <Typography component="div"><strong>Texte de l&apos;oracle :</strong><Box component="p" sx={{ whiteSpace: 'pre-line', mt: 1, color: 'text.secondary' }}>{selectedCard.oracle_text || selectedCard.card_faces?.[0]?.oracle_text || 'Aucun texte disponible.'}</Box></Typography>
          </Stack></DialogContent>
        </>}
      </Dialog>
    </Container>
  )
}

export default BanlistPage