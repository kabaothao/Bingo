var cardNumbers = [];
var allCards = [];

$("#generateCardBtn").click(() => {
  // event.stopPropagation();
  console.log("Im in buildCard");
  $(".column").empty();

  for (let i = 1; i < 5; i++) {
    let cardNumbers = generateCardNumbers();
    // console.log(cardNumbers);

    cardNumbers.forEach((e, index) => {
      console.log(index);
      switch (index) {
        case 0:
        case 5:
        case 10:
        case 15:
        case 20:
          console.log("#A" + i + "1");
          $("#B" + i + "1").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          break;
        case 1:
        case 6:
        case 11:
        case 16:
        case 21:
          $("#I" + i + "2").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          break;
        case 2:
        case 7:
        case 12:
        case 17:
        case 22:
          $("#N" + i + "3").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          break;
        case 3:
        case 8:
        case 13:
        case 18:
        case 23:
          $("#G" + i + "4").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          break;
        case 4:
        case 9:
        case 14:
        case 19:
        case 24:
          $("#O" + i + "5").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          break;
        default:
          console.log("At default");
      }
    });
  }
});

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

const generateCardNumbers = () => {
  cardNumbers = [];
  for (let i = 0; i < 5; i++) {
    let rowNumbers = [];

    rowNumbers.push(Math.floor(Math.random() * (15 - 1)) + 1);
    rowNumbers.push(Math.floor(Math.random() * (30 - 16)) + 16);
    if (i === 2) {
      rowNumbers.push("&#127920");
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
  allCards.push(cardNumbers);
  console.log(all);
  return cardNumbers;
};
