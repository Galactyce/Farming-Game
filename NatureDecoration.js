function NatureDecoration(type, index) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_background);
  console.log(index);
  this.index = index;
  this.spriteType = type;
  this.type = "nature";
  console.log(sprites.nature[type].idle);
  this.loadAnimation(sprites.nature[type].idle, "idle", false);
  this.loadAnimation(sprites.nature[type].shake, "shake", true, 0.09);
  this.playAnimation("idle");
}

NatureDecoration.prototype = Object.create(
  powerupjs.AnimatedGameObject.prototype
);

NatureDecoration.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  var feild = this.parent;
  var player = feild.find(ID.player);
  if (player !== null) {
    console.log(player.layer)
    if (player.position.y > this.position.y + 10) {
      this.layer = ID.layer_background
    }
    else {
      this.layer = ID.layer_background_2
      
    }
    feild.gameObjects.sort(function (a, b) {
      return a.layer - b.layer;
    });
  }
};
