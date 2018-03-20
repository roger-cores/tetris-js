/**
Defines rectangle type
**/
const TYPE_ONE = {
  width:  20,
  height: 20
}, TYPE_TWO = {
  width:  40,
  height: 20
}, TYPE_THREE = {
  width:  60,
  height: 20
}, TYPE_FOUR = {
  width:  80,
  height: 20
};

const types = [TYPE_ONE, TYPE_TWO, TYPE_THREE, TYPE_FOUR];

/**
Constructor to create a rectangle
**/
function Rect(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    this.text = "";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = color;
        ctx.fillRect(this.x+3, this.y+3, this.width-6, this.height-6);
        ctx.fillStyle = "black";
        ctx.fillText(this.text,this.x + this.width/2, this.y + this.height/2);

    }

    this.setText = function(text){
      this.text = text;
    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright <= otherleft) || (myleft >= otherright)) {
            crash = false;
        }
        return crash;
    }

    this.crashWithAfterMove = function(otherobj, left, right){
      var myleft = this.x - left + right;
      var myright = this.x - left + right + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) || (mytop > otherbottom) || (myright <= otherleft) || (myleft >= otherright)) {
          crash = false;
      }
      return crash;
    }

    
}

/**
helper function to create a rectangle
**/
function createRect(type){
    return new Rect(type.width, type.height, "red", 0, 0);
}
