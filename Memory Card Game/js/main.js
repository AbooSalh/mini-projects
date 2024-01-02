const cards = document.querySelectorAll(".card");
let cardOne, cardTwo;
let disableDeck = false;
let matchedCards = 0;
function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
  }
  cardTwo = clickedCard;
  disableDeck = true;
  let cardOneImg = cardOne.querySelector("img").src,
    cardTwoImg = cardTwo.querySelector("img").src;
  console.log(cardOneImg);
  console.log(cardTwoImg);
  matchCards(cardOneImg, cardTwoImg);
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCards++;
    if (matchedCards == 8) {
      setTimeout(shuffleCards, 1000);
    }
    console.log("card matched");
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = null;
    cardTwo = null;
    return (disableDeck = false);
  } else {
    
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = null;
      cardTwo = null;
      disableDeck = false;
    }, 1200);
  }
}
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
function shuffleCards() {
  matchedCards = 0;
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  //   arr.sort(() => {Math.random() > 0.5 ? 1 : -1;});
  shuffle(arr);
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `imgs/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}
shuffleCards();
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
