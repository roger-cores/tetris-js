let gamePiece;
let restingPieces = [];

for(i=0; i<12; i++){
  restingPieces.push([]);
}

function startGame() {
    myGameArea.start();
    gamePiece = createRect(types[getRandomInt(4)]);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 180;
        this.canvas.height = 240;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function findCollapse(){
  for(i=11; i>=0; i--){
    column = 0;
    for(key in restingPieces[i]){
      column += restingPieces[i][key].width;
    }
    if(column == 180){
      restingPieces[i] = [];
      return i;
    }
  }
}

function isGameOver(){
  if(gamePiece.y == 0){
    alert("Game Over");
    restingPieces = [];
    for(i=0; i<12; i++){
      restingPieces.push([]);
    }
    myGameArea.clear();
  }
}

function reOrderAtLevel(level){
  for(let i=0; i<restingPieces[level-1].length; i++){
    if(typeof restingPieces[level-1][i] === 'undefined') continue;
    crashes = false;
    for(let j=0; j<restingPieces[level].length; j++){
      if(typeof restingPieces[level][j] === 'undefined') continue;
      crashes = crashes || restingPieces[level-1][i].crashWith(restingPieces[level][j]);
    }

    if(!crashes){
      rp = restingPieces[level-1][i];
      delete restingPieces[level-1][i];
      rp.y += 20;
      restingPieces[level].push(rp);
    }
  }
}

function updateGameArea() {
    myGameArea.clear();
    if(restingPieces.every(function(restingPieceArray){
      return restingPieceArray.every(function(restingPiece){
        return !gamePiece.crashWith(restingPiece);
      });
    }) && gamePiece.y < myGameArea.canvas.height - 20)
      gamePiece.y += 1;
    else {
      restingPieces[gamePiece.y/20].push(gamePiece);

      collapseLevel = findCollapse();
      console.log("cL: " + collapseLevel);
      if(typeof collapseLevel !== 'undefined'){
        for(let i=collapseLevel; i>=1; i--){
          reOrderAtLevel(i);
        }
      }
      isGameOver();

      gamePiece = createRect(types[getRandomInt(4)]);
    }
    gamePiece.update();

    restingPieces.forEach(function(restingPieceArray, index){
      restingPieceArray.forEach(function(restingPiece){
        restingPiece.setText("" + index);
        restingPiece.update();
      });
    })
}

function moveLeft(){
  if(gamePiece.x - 20 >= 0 && restingPieces.every(function(restingPieceArray){
    return restingPieceArray.every(function(restingPiece){
      return !gamePiece.crashWithAfterMove(restingPiece, 20, 0);
    });
  }))
    gamePiece.x -= 20;
}

function moveRight(){
  if(gamePiece.x + 20 <= myGameArea.canvas.width - gamePiece.width && restingPieces.every(function(restingPieceArray){
    return restingPieceArray.every(function(restingPiece){
      return !gamePiece.crashWithAfterMove(restingPiece, 0, 20);
    });
  }))
    gamePiece.x += 20;
}
