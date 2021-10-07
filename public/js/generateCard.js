// const cardNumbers = require("../js/generateCardNumbers");

var cardNumbers = [];

$("#bButton").click(() => {
  // event.stopPropagation();
  console.log("Im in buildCard");
  // $("numberField").empty();
  let cardNumbers = generateCardNumbers();
  console.log(cardNumbers);
  cardNumbers.forEach((e, index) => {
    console.log(index);
    $("#card1").append("<div class='number col-" + index + "'><span>" + e + "</span></div>");
  });
});

// $(".number").click(function () {
//   $(this).html("<span>X</span>");
// });

const generateCardNumbers = () => {
  for (let i = 0; i < 5; i++) {
    rowNumbers = [];

    rowNumbers.push(Math.floor(Math.random() * (15 - 1)) + 1);
    rowNumbers.push(Math.floor(Math.random() * (30 - 16)) + 16);
    if (i === 2) {
      rowNumbers.push("FREE");
    } else {
      rowNumbers.push(Math.floor(Math.random() * (45 - 31)) + 31);
    }
    rowNumbers.push(Math.floor(Math.random() * (60 - 46)) + 46);
    rowNumbers.push(Math.floor(Math.random() * (75 - 61)) + 61);

    isDuplicate(rowNumbers)
      ? i--
      : rowNumbers.forEach((e) => {
          cardNumbers.push(e);
        });
    // console.log(cardNumbers);
  }
  return cardNumbers;
};

const isDuplicate = (rowNumbers) => {
  for (let i = 0; i < rowNumbers.length; i++) {
    const duplicateCheck = cardNumbers.some((e) => {
      return e === rowNumbers[i];
    });

    if (duplicateCheck === true) {
      return duplicateCheck;
    }
  }
};

// module.exports;
