const cards = document.querySelectorAll('.card');
const TIMER_TIME = 30;

let isFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let button=document.querySelector("button");
let timer=0;
let right_ans=0;



function flipCard() {
  let item = event.target.parentElement
  if (lockBoard) return lockBoard;
  if (event.target.parentElement == firstCard) return firstCard;

  item.classList.add('flip');

  if (!isFlippedCard) {
    isFlippedCard = true;
    firstCard = event.target.parentElement;
    return;
  }
  secondCard = event.target.parentElement;
  if (firstCard.dataset.education === secondCard.dataset.education){
    disableCards();
    right_ans+=1;
    //console.log(right_ans);
  }else{
      unflipCards();
  }
    
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
} // удаляем классы, чтоб развернуть карты

function resetBoard() {
  [isFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
} //обнуляем переменные





//addEventListener, removeEventListener

function show_cards(){
  cards.forEach(card=>card.classList.add('flip'))
  setTimeout(()=> { 
  cards.forEach(card=>card.classList.remove('flip'));
  }, 2000)
}

//timer//
function start_timer(){
  timer=TIMER_TIME;
  button.innerHTML="Оставшееся время: "+timer;
}
setInterval(function(){
  if (timer>0){
    right_ans==6?  button.innerHTML="Победа" : button.innerHTML="Оставшееся время: "+timer;
    cards.forEach(card => card.addEventListener('click', flipCard));
    timer-=1;
    
  }else{
    cards.forEach(card => card.removeEventListener('click', flipCard));
    right_ans==6?  button.innerHTML="Победа" : button.innerHTML="Начать";
  }
}, 1000); 
//timer//

//begin//
button.onclick=function(){
  right_ans=0;
  button.innerHTML="Запоминай!";
  //cards.forEach(card => card.addEventListener('click', flipCard));
  [...cards].forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
  show_cards();
  setTimeout(() => {
    start_timer();
  }, 2000);
}
//begin//