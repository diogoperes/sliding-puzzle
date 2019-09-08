import '../styles/index.scss';
import $ from 'jquery';

console.log('webpack starterkit');


$(document).ready(function(){
  const MARGIN =2;
  const BORDER =1;

  let history = [];

  getStorage();

  let PUZZLE_HEIGHT = $("#option_size option:selected").val();
  let PUZZLE_WIDTH = $("#option_size option:selected").val();
  let boardSize= $('#board').width();
  let boardHeight= $('#board').height();
  let squareWidth = boardSize/(PUZZLE_WIDTH);
  let squareHeight = boardSize/(PUZZLE_HEIGHT);
  let historyEl = document.getElementById('historyItems');

  let gapY = PUZZLE_HEIGHT - 1;
  let gapX = PUZZLE_WIDTH - 1;

  let movements = 0;
  let time = 0;
  let timer;
  let hasWin = false;

  // let history = [
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  //   {
  //     puzzleType: '5x5',
  //     timestamp: Date.now(),
  //     moves: '27',
  //     time: '27:28'
  //   },
  // ];

  let image1 = "https://tinyurl.com/ydex5sr4";
  let image2 = "https://tinyurl.com/https-puzzlepics2";
  let image3 = "https://tinyurl.com/https-puzzlepics3";
  let image4 = "https://tinyurl.com/https-puzzlepics4";
  let image5 = "https://tinyurl.com/https-puzzlepics5";
  let image6 = "https://tinyurl.com/https-puzzlepics6";
  let image7= "https://tinyurl.com/https-puzzlepics7";
  let image8= "https://tinyurl.com/https-puzzlepics8";
  let image9= "https://tinyurl.com/https-puzzlepics9";

  // let images= [
  //   [image1, image2, image3],
  //   [image4, image5, image6],
  //   [image7, image8, image9]
  // ];

  // let squares =[
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, null]
  // ];

  let squares = [];

  //
  // function fillSquares(){
  //     for(let y=0; y<3; y++){
  //         for(let x=0; x<3; x++){
  //             let value = y*3 + x+1;
  //             let image = images[y][x];
  //             if(value <9){
  //                 let piece = $('<img class="square" src=' + image + '>');
  //                 piece.css({
  //                   width: (boardSize / 3) + "px",
  //                   height: (boardHeight / 3) + "px"
  //                 });
  //                 $('#board').append(piece);
  //                  piece.data("y", y).data("x", x);
  //                  squares[y][x] = piece;
  //             }
  //         }
  //     }
  //     setBoard();
  // }

  function fillSquaresNumbers(){
    for(let y=0; y<PUZZLE_HEIGHT; y++){
      let row = [];
      for(let x=0; x<PUZZLE_WIDTH; x++){
        let value = y*PUZZLE_HEIGHT + x+1;
        // let image = images[y][x];
        // if(value <9){
        if(!(y === PUZZLE_HEIGHT - 1 && x === PUZZLE_WIDTH - 1)){
          // let piece = $('<img class="square" src=' + image + '>');
          let piece = $('<div class="square"> <div class="square-number">' + value + '</div></div>');
          piece.css({
            // width: (boardSize / PUZZLE_WIDTH) + "px",
            // height: (boardHeight / PUZZLE_HEIGHT) + "px"
            width: boardSize/PUZZLE_WIDTH + 'px',
            height: boardSize/PUZZLE_HEIGHT + 'px'
          });
          piece.click((event) => clickSquareHandler(event));
          $('#board').append(piece);
          piece.data("y", y).data("x", x).data("value", value);
          row.push(piece);
          // squares[y][x] = piece;
        }else {
          row.push(null);
        }
      }
      squares.push(row);
    }
    // console.log('squares', squares);
  }

  function setBoard(){
    for(let y=0; y<PUZZLE_HEIGHT; y++){
      for(let x=0; x<PUZZLE_WIDTH; x++){
        let piece = squares[y][x];
        if(piece){
          piece.css({
            top: piece.data('y') * squareHeight,
            left: piece.data('x') * squareWidth
          });
        }
      }
    }
  }

  function clickSquareHandler(event) {
    let clickedElement = $(event.target);
    let x = clickedElement.data('x');
    let y = clickedElement.data('y');
    // console.log('x', x);
    // console.log('y', y);
    // console.log('squares[y - 1][x]', squares[y][x]);

    if(y < PUZZLE_HEIGHT - 1 && squares[y + 1][x] === null) {    //check if gap is down
      down(true);
    }else if(y > 0 && squares[y - 1][x] === null) {   //check if gap is up
      up(true);
    }else if(x >= 0 && squares[y][x + 1] === null) {   //check if gap is right
      right(true);
    }else if(x < PUZZLE_WIDTH && squares[y][x - 1] === null) {   //check if gap is left
      left(true);
    }
  }

  function down(isPlayerAction) {
    if(gapY > 0 && (!isPlayerAction || !hasWin)){
      let piece = squares[gapY-1][gapX];
      squares[gapY][gapX] = piece;
      piece.data('y', gapY);
      slide(piece, isPlayerAction);
      gapY -= 1;
      squares[gapY][gapX] = null;
      if(isPlayerAction) {
        let count = parseInt($('#movements').text());
        $('#movements').text(count+1);
        if(timer === undefined) startTimer();
        verifyIfWon();
      }
    }
  }

  function up(isPlayerAction) {
    if(gapY < PUZZLE_HEIGHT - 1 && (!isPlayerAction || !hasWin)){
      let piece = squares[gapY+1][gapX];
      squares[gapY][gapX] = piece;
      piece.data('y', gapY);
      slide(piece, isPlayerAction);
      gapY += 1;
      squares[gapY][gapX] = null;
      if(isPlayerAction) {
        let count = parseInt($('#movements').text());
        $('#movements').text(count+1);
        if(timer === undefined) startTimer();
        verifyIfWon();
      }
    }
  }

  function left(isPlayerAction){
    if(gapX < PUZZLE_WIDTH - 1 && (!isPlayerAction || !hasWin)){
      let piece = squares[gapY][gapX+1];
      squares[gapY][gapX] = piece;
      piece.data('x', gapX);
      slide(piece, isPlayerAction);
      gapX += 1;
      squares[gapY][gapX] = null;
      if(isPlayerAction) {
        let count = parseInt($('#movements').text());
        $('#movements').text(count+1);
        if(timer === undefined) startTimer();
        verifyIfWon();
      }
    }
  }

  function right(isPlayerAction){
    if(gapX > 0 && (!isPlayerAction || !hasWin)){
      let piece = squares[gapY][gapX-1];
      squares[gapY][gapX] =piece;
      piece.data('x', gapX);
      slide(piece, isPlayerAction);
      gapX -= 1;
      squares[gapY][gapX] = null;
      if(isPlayerAction) {
        let count = parseInt($('#movements').text());
        $('#movements').text(count+1);
        if(timer === undefined) startTimer();
        verifyIfWon();
      }
    }
  }

  function verifyIfWon() {
    let height = squares.length;
    let width = squares[0].length;
    let prevNumber = 0;
    let hasWon = true;

    for(let y=0; y<height; y++){
      for(let x=0; x<width; x++){
        if(!(y === height - 1 && x === width - 1)) {
          if(squares[y][x] === null || prevNumber !== squares[y][x].data().value - 1) {
            hasWon = false;
          }else {
            prevNumber = squares[y][x].data().value;
          }
        }
      }
    }
    if(hasWon) {
      showWin();
    }
  }

  function slide(piece, isPlayerAction){
    if(isPlayerAction) {
      piece.animate({
          top: piece.data('y') * squareHeight,
          left: piece.data('x') * squareWidth
        },
        200);
    }else {
      piece.css({
          top: piece.data('y') * squareHeight,
          left: piece.data('x') * squareWidth
        });
    }



  }

  function keydown(e) {
    switch (e.which) {
      case 32:
        newGame();
        break;
      case 37:
        if (gapX < PUZZLE_WIDTH - 1) {
          left(true);
        }
        break;
      case 38:
        if (gapY < PUZZLE_HEIGHT - 1) {
          up(true);
        }
        break;
      case 39:
        if (gapX > 0) {
          right(true);
        }
        break;
      case 40:
        if (gapY > 0) {
          down(true);
        }
        break;
    }
  }

  function shuffle(){
    for(let i=0; i<1; i++){
      let random = Math.random();
      if(random < 0.25){
        up(false);
      }
      else if(random < 0.5){
        down(false);
      }
      else if(random < 0.75){
        right(false);
      }
      else{
        left(false);
      }
    }
  }

  function quickShuffle(){
    for(let i=0; i<1000; i++){
      let random = Math.random();
      if(random < 0.25){
        up(false);
      }
      else if(random < 0.5){
        down(false);
      }
      else if(random < 0.75){
        right(false);
      }
      else{
        left(false);
      }
    }
  }

  // function quickShuffle(){
  //   console.log('quick shuffle');
  //   for(let i=0; i<PUZZLE_HEIGHT; i++){
  //     for(let j=0; j<PUZZLE_WIDTH; j++){
  //       if(squares[i][j] !== null) {
  //         let piece = squares[i][j];
  //         let nextY, nextX;
  //         let findNextPlace = true;
  //         while (findNextPlace) {
  //           nextY = Math.floor(Math.random() * PUZZLE_HEIGHT);
  //           nextX = Math.floor(Math.random() * PUZZLE_WIDTH);
  //           if((nextY === gapY && nextX === gapX) === false) {
  //             findNextPlace = false;
  //           }
  //         }
  //
  //         // console.log('piece', piece);
  //
  //         let secondPieceToChange = squares[nextY][nextX];
  //         squares[nextY][nextX] = piece;
  //         piece.data('y', nextY).data('x', nextX);
  //
  //         squares[i][j] = secondPieceToChange;
  //         secondPieceToChange.data('y', i).data('x', j);
  //       }
  //     }
  //   }
  // }

  function drawBoard() {
    let size = 600;
    let screenWidth = $(window).width();

    if(screenWidth < 620) {
      size = screenWidth - 20;
    }

    $('#board').css({
      width: size,
      height: size
    });
    boardSize = size;
    squareWidth= boardSize/(PUZZLE_WIDTH);
    squareHeight= boardSize/(PUZZLE_HEIGHT);
  }

  $(window).resize(()=>{
    resize();
  });

  function resize(){
    // console.log('resize');

    drawBoard();

    let height = squares.length;
    let width = squares[0].length;

    for(let y=0; y<height; y++){
      for(let x=0; x<width; x++){
        let piece = $(squares[y][x]);
        piece.css({
          width: boardSize/PUZZLE_WIDTH + 'px',
          height: boardSize/PUZZLE_HEIGHT + 'px',
          top: piece.data('y') * squareHeight,
          left: piece.data('x') * squareWidth
        });
      }
    }

  }

  function startTimer() {
    timer = setInterval(incrementTime, 1000);
  }
  function incrementTime() {
    // console.log('timer');
    let timeString = $('#timer').text();
    let minutes = parseInt(timeString.split(":")[0]);
    let seconds = parseInt(timeString.split(":")[1]);
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      // if (minutes >= 60) {
      //   minutes = 0;
      //   hours++;
      // }
    }
    seconds = seconds > 9 ? seconds : "0" + seconds;
    minutes = minutes > 9 ? minutes : "0" + minutes;

    $('#timer').text(minutes + ":" + seconds);
  }

  function newGame() {
    clearBoard();
    drawBoard();
    fillSquaresNumbers();
    quickShuffle();
    setBoard();
    $('#movements').text('0');
    $('#timer').text('00:00');
    hasWin = false;
    if(timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
    // console.log('squares', squares);
    // startTimer();
  }

  function clearBoard() {
    // let height = squares.length;
    // let width = squares[0].length;
    //
    // for(let y=0; y<height; y++){
    //   for(let x=0; x<width; x++){
    //     $(squares[y][x]).remove();
    //   }
    // }
    let board = document.getElementById("board");
    while (board.lastChild) {
      board.removeChild(board.lastChild);
    }

    gapY = PUZZLE_HEIGHT - 1;
    gapX = PUZZLE_WIDTH - 1;
    squareWidth= boardSize/(PUZZLE_WIDTH);
    squareHeight= boardSize/(PUZZLE_HEIGHT);
    squares =[];
  }

  function showWin(){
    hasWin = true;
    clearInterval(timer);
    $("#board").append('<div class="win-text-container"><div class="win-text">WIN</div></div>');

    let newHistoryItem = {
      puzzleType: $("#option_size option:selected").text(),
      timestamp: Date.now(),
      moves: $("#movements").text(),
      time: $("#timer").text()
    };

    history.push(newHistoryItem);
    localStorage['history'] = JSON.stringify(history);
    addToHistory(newHistoryItem );
    $('#historyItems').animate({
      scrollTop: historyEl.scrollHeight
    }, 800);
  }

  $('#shuffle').click(function(){
    // $('#movements').text('0');
    shuffle();
  });

  $('#new-game').click(() =>newGame());

  $('#clearHistory').click(() =>clearHistory());

  $('#historyBtn').click((event) => {
    openHistory();
    event.stopPropagation();
  });

  $('#gameContainer').click(() =>closeHistory());
  $('#closeHistory').click(() =>closeHistory());

  $("#option_size").change(function(){
    PUZZLE_HEIGHT = $("#option_size option:selected").val();
    PUZZLE_WIDTH = $("#option_size option:selected").val();
    localStorage['puzzleSize'] = PUZZLE_WIDTH;
    // localStorage['puzzlesize'] = puzzlePieces;
    newGame();
  });

  $(function(e){
    $(document).keydown(keydown);
    drawBoard();
    fillSquaresNumbers();
    quickShuffle();
    // shuffle();
    setBoard();
    drawHistory();
    // startTimer();
    if(timer !== undefined) {
      clearInterval(timer);
    }
  });

  function getStorage(){
    if (localStorage['puzzleSize']) {
      $(`#option_size`).val(localStorage['puzzleSize']);
      PUZZLE_HEIGHT = localStorage['puzzleSize'];
      PUZZLE_HEIGHT = localStorage['puzzleSize'];
    }

    if (localStorage['history']) {
      history = JSON.parse(localStorage['history']);
    }

    // if(localStorage['numberhint'] == "true"){
    //   $("#option_numbers").attr("checked", true);
    //   showNumbers = true;
    // }
  }

  function drawHistory() {

    while (historyEl.firstChild) {
      historyEl.removeChild(historyEl.firstChild);
    }

    history.forEach(function(element) {
      addToHistory(element);
    });

  }

  function addToHistory(element) {

    if(history.length > 0 && document.getElementById('historyItems').firstChild === null) {
      let div = document.createElement('div');
      div.setAttribute('class', 'history-item');
      div.innerHTML = `
          <div class="infoNames container">
            <div class="type">Type</div>
            <div class="moves">Moves</div>
            <div class="time">Time</div>
          </div>
      `;
      historyEl.appendChild(div);
    }

    let div = document.createElement('div');
    div.setAttribute('class', 'history-item');
    div.innerHTML = `
          <div class="infoValues container">
            <div class="type">${element.puzzleType}</div>
            <div class="moves">${element.moves}</div>
            <div class="time">${element.time}</div>
          </div>
          <div class="date container">
            <div>${timeConverter(element.timestamp)}</div>
          </div>
      `;
    historyEl.appendChild(div);

  }

  function clearHistory() {
    localStorage['history'] = "";
    history = [];
    drawHistory();
  }
  
  function openHistory() {
    let historyContainer = $('#history');
    if(historyContainer.hasClass('open')) {
      historyContainer.removeClass('open');
    }else {
      historyContainer.addClass('open');
    }
  }

  function closeHistory() {
    let historyContainer = $('#history');
    if(historyContainer.hasClass('open')) {
      historyContainer.removeClass('open');
    }
  }

  function timeConverter(timestamp){
    let a = new Date(timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    let sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

});
