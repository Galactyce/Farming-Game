function Player() {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_background_1, ID.player);
  this.lastDirection = 'front'
  this.loadAnimation(sprites.main_character['idle'].front, 'idle_front', true);
  this.loadAnimation(sprites.main_character['idle'].back, 'idle_back', true);
  this.loadAnimation(sprites.main_character['idle'].right, 'idle_right', true);
  this.loadAnimation(sprites.main_character['idle'].left, 'idle_left', true);
  this.loadAnimation(sprites.main_character['run'].front, 'run_front', true, 0.08);
  this.loadAnimation(sprites.main_character['run'].back, 'run_back', true, 0.08);
  this.loadAnimation(sprites.main_character['run'].right, 'run_right', true, 0.08);
  this.loadAnimation(sprites.main_character['run'].left, 'run_left', true, 0.08);

  this.playAnimation('idle_front')

  this.position = new powerupjs.Vector2(500, 300)
}

Player.prototype = Object.create(powerupjs.AnimatedGameObject.prototype)

Player.prototype.update = function(delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  if (powerupjs.Game.gameWorld.map.mode !== "playing") return;
  if (powerupjs.Keyboard.down(38)) {
    if (this.velocity.x === 0)
    this.playAnimation("run_back")
    this.lastDirection = 'back'
    this.velocity.y = -250
  }
  else if (powerupjs.Keyboard.down(40)) {
    if (this.velocity.x === 0)
    this.playAnimation('run_front')
    this.lastDirection = 'front'
    this.velocity.y = 250
  }
  else {
    this.velocity.y = 0
    
  }
  if (powerupjs.Keyboard.down(37)) {
    this.playAnimation('run_left')
    this.lastDirection = 'left'
    this.velocity.x = -250
  }
  else if (powerupjs.Keyboard.down(39)) {
    this.playAnimation('run_right')
    this.lastDirection = 'right'
    this.velocity.x = 250
  }
  else {
    this.velocity.x = 0
  }
  if (this.velocity.x === 0 && this.velocity.y === 0) {
    if (this.lastDirection === 'front')
    this.playAnimation('idle_front')
    else if (this.lastDirection === 'back') 
    this.playAnimation('idle_back')
    if (this.lastDirection === 'right') 
    this.playAnimation('idle_right')
    if (this.lastDirection === 'left') 
    this.playAnimation('idle_left')
  }

  var bounds = powerupjs.Game.gameWorld.map.areas[powerupjs.Game.gameWorld.map.currentAreaIndex].find(ID.boundaries);
  for (var i=0; i<bounds.gameObjects.length; i++) {
    if (bounds.gameObjects[i] === undefined) continue;
    var boundary = bounds.gameObjects[i];
    var boundingBox = this.boundingBox;
    if (boundingBox.intersects(boundary.boundingBox)) {
      var depth = boundingBox.calculateIntersectionDepth(boundary.boundingBox)
      if (Math.abs(depth.y) > Math.abs(depth.x)) {
        this.position.x += depth.x
      }
      else {
        this.position.y += depth.y
      }
    }
  }
}