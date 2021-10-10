let winner = false;

//numbers array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 58, 59, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]

//random number generator 
function getRandomInt(numbers) {
  return Math.floor(Math.random() * 76);
}

let currentNumber = getRandomInt(numbers);

switch(true) {
  case currentNumber <= 15 && currentNumber > 0:
    $('#bingoCount').append("B " + currentNumber);
    break;
  case currentNumber < 31:
  $('#bingoCount').append("I " + currentNumber);
    break;
  case currentNumber < 46:
  $('#bingoCount').append("N " + currentNumber);
    break;
  case currentNumber < 61:
  $('#bingoCount').append("G " + currentNumber);
    break;
  case currentNumber < 76:
  $('#bingoCount').append("O " + currentNumber);
    break;
  default: 
   alert ("Out of numbers")
  // console.log('default');
    break;
}

// console.log(`${currentNumber}`);
//append results to the webpage
// $('#bingoCount').append(`${currentNumber}`)
