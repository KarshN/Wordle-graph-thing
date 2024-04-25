var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
function Text(x, y, text, font, color) {
  context.fillStyle = color;
  context.font = font;
  context.fillText(text, x, y);
  context.fillText(text, x, y);
}
function wordsWith(quantity,letter){
  
}
function quantities(index) {
  var quantities = [];
  var currentWord;
  for (var n = 0; n < 26; n++) {
    quantities.push(0);
  }
  for (var i = 0; i < window.words.length; i++) {
    currentWord = window.words[i];
    quantities[contains(letters, currentWord[index])] += 1;
  }
  return quantities;
}
function contains(list, item) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] == item) {
      return i;
    }
  }
  return false;
}
function wordsContaining(letter) {
  var amount = 0;
  for (var i = 0; i < window.words.length; i++) {
    if (contains(window.words[i], letter)) {
      amount++;
    }
  }
  return amount;
}
function greenScore(word) {
  //the expected value for the amount of green letters appearing in a word
  var letterIndexes = 0;
  var greenScore = 0;
  var lettersLapsed = [];
  for (var i = 0; i < 5; i++) {
    if (contains(lettersLapsed, word[i])===false) {
    letterIndexes = quantities(i);
    greenScore += (letterIndexes[contains(letters, word[i])]) / window.words.length;
    lettersLapsed.push(word[i]);
    }
  }
  return greenScore;
}
function yellowScore(word) {
  //the expected value for the amount of yellow letters in a word
  var yellowScore = 0;
  var lettersLapsed = [];
  var currentWord = "";
  var increment;
  var array;
  for (var i = 0; i < 5; i++) {
    if (contains(lettersLapsed, word[i])===false) {
      array = quantities(i);
      increment = wordsContaining(word[i]) - array[contains(letters, word[i])];
      increment = increment / window.words.length;
      yellowScore += increment;
    }
    lettersLapsed.push(word[i]);
  }
  return yellowScore;
}
function rect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.stroke();
  context.lineWidth = 4;
}

function graphWords() {
  //takes about 70 secs
  for (var i = 0; i < window.words.length; i++) {
    rect(greenScore(window.words[i]) * 2500, 3600 - (yellowScore(window.words[i]) * 600), 2, 2, "red");
    Text(greenScore(window.words[i]) * 2500, 3600 - (yellowScore(window.words[i]) * 600) + 10, window.words[i], "10px Arial", "black");
  }
}
function graphTotals(){
  //takes about 70 secs
  for (var i = 0; i < window.words.length; i++) {
    var y = Math.random()*3600;
    rect((greenScore(window.words[i])+yellowScore(window.words[i])) * 1000, y, 2, 2, "red");
    Text((greenScore(window.words[i])+yellowScore(window.words[i])) * 1000, y + 10, window.words[i], "10px Arial", "black");
  }

}
graphWords();




