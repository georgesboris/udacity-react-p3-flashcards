import { AsyncStorage } from "react-native"
import uuid from "uuid"
import omit from "ramda/es/omit"

const DECKS_KEY = "@Flashcards/Decks"

/**
 * This method is supposed to be run sequencially so to simulate actual
 * creation of decks and cards (with unique timestamps).
 */

export async function initialFetchDecks() {
  const decks = await fetchDecks()
  if (Object.keys(decks).length) {
    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
    return decks
  }

  const deckRedux = await createDeck("Redux")
  const deckReact = await createDeck("React")
  const deckUdacity = await createDeck("Udacity")

  await createCard(deckUdacity.id, "Is Udacity great?", "You betcha!")
  await createCard(
    deckUdacity.id,
    "Should you tell your friends about Udacity?",
    "Of course! You will be able to talk about it during get togethers! Wouldn't that be awesome?"
  )
  await createCard(
    deckReact.id,
    "Is React the future?",
    "Nop. Is it's the present!"
  )
  await createCard(
    deckReact.id,
    "Will React be around for a while?",
    "It seems that it will! And even if it doesn't it's paradigm will for sure."
  )

  return fetchDecks()
}

export function fetchDecks(passthrough) {
  return AsyncStorage.getItem(DECKS_KEY).then(decks => {
    if (decks) {
      return JSON.parse(decks)
    } else {
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify({})).then(
        () => ({})
      )
    }
  })
}

/**
 * Decks
 */

export function createDeck(title) {
  const deck = {
    id: uuid.v4(),
    title,
    cards: {},
    order: Date.now()
  }

  return AsyncStorage.mergeItem(
    DECKS_KEY,
    JSON.stringify({
      [deck.id]: deck
    })
  ).then(() => deck)
}

export function updateDeck(deckId, title) {
  return AsyncStorage.getItem(DECKS_KEY).then(data => {
    const decks = JSON.parse(data)

    return AsyncStorage.mergeItem(
      DECKS_ITEM,
      JSON.stringify({
        ...decks,
        [deckId]: {
          ...deck[deckId],
          title
        }
      })
    )
  })
}

export function removeDeck(deckId) {
  return AsyncStorage.getItem(DECKS_KEY).then(data => {
    const decks = JSON.parse(data)
    return AsyncStorage.setItem(DECKS_ITEM, JSON.stringify(omit(decks, deckId)))
  })
}

/**
 * Cards
 */

export function createCard(deckId, question, answer) {
  const card = {
    id: uuid.v4(),
    question,
    answer,
    order: Date.now()
  }

  return AsyncStorage.getItem(DECKS_KEY)
    .then(data => {
      const decks = JSON.parse(data)
      const deck = decks[deckId]
      return AsyncStorage.mergeItem(
        DECKS_KEY,
        JSON.stringify({
          [deck.id]: {
            ...deck,
            cards: {
              ...deck.cards,
              [card.id]: card
            }
          }
        })
      )
    })
    .then(() => card)
}

export function updateCard(deckId, cardId, question, answer) {
  return AsyncStorage.getItem(DECKS_KEY).then(data => {
    const decks = JSON.parse(data)
    const deck = decks[deckId]

    return AsyncStorage.mergeItem(
      DECKS_ITEM,
      JSON.stringify({
        [deckId]: {
          ...deck,
          cards: {
            ...deck.cards,
            [cardId]: {
              ...deck.cards[cardId],
              question,
              answer
            }
          }
        }
      })
    )
  })
}

export function removeCard(deckId, cardId) {
  return AsyncStorage.getItem(DECKS_KEY).then(data => {
    const decks = JSON.parse(data)
    const deck = decks[deckId]

    return AsyncStorage.mergeItem(
      DECKS_ITEM,
      JSON.stringify({
        [deckId]: {
          ...deck,
          cards: omit(deck.cards, cardId)
        }
      })
    )
  })
}
