var dealerSum=0;
var yourSum=0;


var dealerAceCount=0;
var yourAceCount=0;

var temp=0;
var hidden;
var deck;
var started=false;

var canHit=true; //this will allow the player to draw till yourSum<=21

function buildDeck()
{
  let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck=[];
    for(let i=0;i<types.length;i++)
    {
      for(let j=0;j<values.length;j++)
      {
        deck.push(values[j]+"-"+types[i]); //this corresponds to the card image names in the Cards folder
      }
    }
}
function shuffleDeck()
{
  for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}
function startGame()
{
 if(started==true)
 return;
  buildDeck();
  shuffleDeck();
  started=true;
  hidden=deck.pop();
  dealerSum+=getValue(hidden);
  dealerAceCount+=checkAce(hidden);
  //console.log(hidden);
  //console.log(dealerSum);

     let cardImg=document.createElement("img");
     let card=deck.pop();
     cardImg.src="Cards/"+card+".png";
     dealerSum+=getValue(card);
     dealerAceCount+=checkAce(card);
     document.getElementById("dealer-cards").append(cardImg);
  for(let i=0;i<2;i++)
  {
    let cardImg=document.createElement("img");
    let card=deck.pop();
    cardImg.src="Cards/"+card+".png";
    yourSum+=getValue(card);
    yourAceCount+=checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  }
  document.getElementById("dealer-sum").textContent=(dealerSum-getValue(hidden));
  document.getElementById("your-sum").textContent=yourSum;

}
function getValue(card)
{
  let data=card.split("-");  //10-C -> ["10","C"]
  let value=data[0];
  if(isNaN(value))
  {
    if(value=="A")
    return 11;
    return 10;
  }
  return parseInt(value);
}
function checkAce(card)
{
  if(card[0]=='A')
  return 1;
  return 0;
}
function hit()
{
  console.log(yourAceCount);
  if(!canHit||!started)
  return;
  let cardImg=document.createElement("img");
  let card=deck.pop();
  cardImg.src="Cards/"+card+".png";
  yourSum+=getValue(card);
  yourAceCount+=checkAce(card);
   yourSum =reducedAce(yourSum, yourAceCount);
   yourAceCount=temp;
  document.getElementById("your-cards").append(cardImg);
  document.getElementById("your-sum").textContent=yourSum;
  if(reducedAce(yourSum,yourAceCount)>=21)
  {
    canHit=false;
    stay();
  }

}
function reducedAce(playerSum,playerAceCount)
{
  while(playerSum>21&&playerAceCount>0)
  {
    playerSum-=10;
    playerAceCount-=1;
  }
  temp=playerAceCount;
  return playerSum;
}
function stay()
{
  if(!started)
  return;
  while(reducedAce(dealerSum, dealerAceCount)<17)
  {
    let cardImg=document.createElement("img");
    let card=deck.pop();
    cardImg.src="Cards/"+card+".png";
    dealerSum+=getValue(card);
    dealerAceCount+=checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }
  dealerSum =  reducedAce(dealerSum, dealerAceCount);
   yourSum =  reducedAce(yourSum, yourAceCount);

   canHit=false;
   document.getElementById("hidden").src="Cards/"+hidden+".png";
   let message="";
   if(yourSum>21)
   {
     message="You Lose !";
   }
   else if(dealerSum>21)
   {
     message="You Win !";
   }
   else if(yourSum==dealerSum)
   {
     message="Tie !";
   }
   else if(yourSum>dealerSum)
   {
     if(yourSum==21)
     message="BlackJack !"
     message="You Win !";
   }
   else
   {
     message="You Lose !";
   }
   document.getElementById("dealer-sum").textContent=dealerSum;
   document.getElementById("your-sum").textContent=yourSum;
   document.getElementById("results").textContent=message;
}
function reset()
{
  location.reload();
}
