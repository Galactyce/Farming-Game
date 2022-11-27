function NatureDecoration(type, index, position, fruitType) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_background);
  this.index = index;
  this.spriteType = type;
  this.type = "nature";
  this.loadAnimation(sprites.nature[type].idle, "idle", false);
  this.loadAnimation(sprites.nature[type].shake, "shake", false, 0.09);
  this.fruitType = fruitType;
  console.log(fruitType)
  this.fruits = new powerupjs.GameObjectList(ID.layer_background_1)

  if (this.fruitType !== undefined) {
  var fruit1 = new powerupjs.SpriteGameObject(sprites.fruits[fruitType], 1, 0, ID.layer_overlays);
  fruit1.position = new powerupjs.Vector2(position.x + 20, position.y + 20);
  this.fruits.add(fruit1)

  var fruit2 = new powerupjs.SpriteGameObject(sprites.fruits[fruitType], 1, 0, ID.layer_overlays);
  fruit2.position = new powerupjs.Vector2(position.x, position.y + 10);
  this.fruits.add(fruit2)


  var fruit3 = new powerupjs.SpriteGameObject(sprites.fruits[fruitType], 1, 0, ID.layer_overlays);
  fruit3.position = new powerupjs.Vector2(position.x + 40, position.y + 10);
  this.fruits.add(fruit3)
  }
  this.playAnimation("idle");
  console.log(this.fruits)
}

NatureDecoration.prototype = Object.create(
  powerupjs.AnimatedGameObject.prototype
);

NatureDecoration.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  var feild = this.parent;
  var player = feild.find(ID.player);
  var switchPoint = this.position.y
  if (this.spriteType === 'oak_tree' || this.spriteType === 'pine_tree') {
    switchPoint = this.position.y + 40
  }
 
  if (player !== null) {
    if (player.position.y > switchPoint) {
      this.layer = ID.layer_background
    }
    else {
      this.layer = ID.layer_background_2
      
    }
    feild.gameObjects.sort(function (a, b) {
      return a.layer - b.layer;
    });
  }
  this.fruits.update(delta)

  var distanceX = Math.abs(player.position.x - this.position.x);
  var distanceY = Math.abs(player.position.y - this.position.y);
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  if (distance < 60) {
    if (powerupjs.Keyboard.pressed(32)) {
      console.log(this.spriteType)
      if (this.spriteType === 'oak_tree' || this.spriteType === 'pine_tree') 
      this.shake()
    }
  }
  else {
    this.playAnimation('idle')
  }
  
};

NatureDecoration.prototype.shake = function() {
  this.playAnimation('shake');
  var area = powerupjs.Game.gameWorld.map.areas[powerupjs.Game.gameWorld.map.currentAreaIndex];
  var objects = area.find(ID.objects);
  console.log(objects)
  if (this.fruitType !== undefined && this.fruits.visible) {
    console.log(this.fruitType)
    var droppedFruit1 = new Plant(this.fruitType, 'tree_fruit', new powerupjs.Vector2(0, this.position.y + 80));
    droppedFruit1.position = new powerupjs.Vector2(this.position.x + 20, this.position.y + 20)
   
    objects.add(droppedFruit1)

    var droppedFruit2 = new Plant(this.fruitType, 'tree_fruit', new powerupjs.Vector2(0, this.position.y + 60));
    droppedFruit2.position = new powerupjs.Vector2(this.position.x, this.position.y + 10)
   
    objects.add(droppedFruit2)

    var droppedFruit3 = new Plant(this.fruitType, 'tree_fruit', new powerupjs.Vector2(0, this.position.y + 60));
    droppedFruit3.position = new powerupjs.Vector2(this.position.x + 40, this.position.y + 10)
   
    objects.add(droppedFruit3)

    this.fruits.visible = false

  }

}

NatureDecoration.prototype.draw = function() {
  powerupjs.AnimatedGameObject.prototype.draw.call(this);
  this.fruits.draw()
}