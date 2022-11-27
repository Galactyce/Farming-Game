function NatureDecoEditor(areaIndex) {
  powerupjs.GameObjectGrid.call(this, 60, 100, ID.layer_overlays);
  this.cellWidth = 16;
  this.cellHeight = 16;
  this.tilePosition = new powerupjs.Vector2(0, 0);
  this.types = new Array();
  for (let i in sprites.nature) {
    this.types.push(i)
  }
  this.fruitTypes = new Array();
  for (let i in sprites.fruits) {
    this.fruitTypes.push(i)
  }
  this.currentTypeIndex = 0
  this.fruitSelected = false;
  this.currentFruitIndex = 0
  this.mode = "draw";
}

NatureDecoEditor.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

NatureDecoEditor.prototype.update = function (delta) {
  powerupjs.GameObjectGrid.prototype.update.call(this, delta);
  if (powerupjs.Game.gameWorld.map.mode !== "nature_deco_editing") return;
  this.tilePosition.x =
    Math.floor(powerupjs.Mouse.position.x / this.cellWidth) * this.cellWidth;
  this.tilePosition.y =
    Math.floor(powerupjs.Mouse.position.y / this.cellHeight) * this.cellHeight;

  if (powerupjs.Keyboard.pressed(66)) {
    this.mode = "draw";
  }
  if (powerupjs.Keyboard.pressed(69)) {
    this.mode = "erase";
  }
  if (powerupjs.Keyboard.pressed(49)) {
    this.fruitSelected = false
  }
  if (powerupjs.Keyboard.pressed(50)) {
    this.fruitSelected = true
  }
  var fruits = new Array();
  for (var i in sprites.fruits) {
    fruits.push(i)
  };

  if (powerupjs.Keyboard.pressed(38)) {
    this.currentFruitIndex++
    if (this.currentFruitIndex > fruits.length - 1) {
      this.currentFruitIndex = 0
    }
  }

  if (powerupjs.Keyboard.pressed(40)) {
    this.currentFruitIndex--
    if (this.currentFruitIndex < 0) {
      this.currentFruitIndex = fruits.length - 1
    }
  }


  if (powerupjs.Keyboard.pressed(37)) {
    this.currentTypeIndex++;
    if (this.currentTypeIndex > this.types.length - 1) {
      this.currentTypeIndex = 0;
    }
  }

  if (powerupjs.Keyboard.pressed(39)) {
    this.currentTypeIndex--;
    if (this.currentTypeIndex < 0) {
      this.currentTypeIndex = this.types.length - 1;
    }
  }

  var area = this.parent;
  var feild = area.find(ID.objects);
  if (powerupjs.Mouse._left.pressed) {
    if (this.mode === "draw") {
      if (this.fruitSelected) {
      var decoration = new NatureDecoration(
          this.types[this.currentTypeIndex],
          new powerupjs.Vector2(
            this.tilePosition.x / this.cellWidth,
            this.tilePosition.y / this.cellHeight,
          ),
          this.tilePosition,
          this.fruitTypes[this.currentFruitIndex]
      )
      }
      else {
        var decoration = new NatureDecoration(
          this.types[this.currentTypeIndex],
          new powerupjs.Vector2(
            this.tilePosition.x / this.cellWidth,
            this.tilePosition.y / this.cellHeight,
          ),
          this.tilePosition,
          undefined
      )
      }
   
      decoration.position = new powerupjs.Vector2(this.tilePosition.x, this.tilePosition.y)
      feild.add(
        decoration
      );
    }
    else if (this.mode === 'erase') {
      for (var i=0; i<feild.gameObjects.length; i++) {
        var decoration = feild.gameObjects[i];
        if (decoration === undefined) continue
        if (decoration.boundingBox.contains(powerupjs.Mouse._position)) {
          feild.gameObjects[i] = undefined;
          
        }
      }
    }
    powerupjs.Game.gameWorld.saveObjects()
  }
};



NatureDecoEditor.prototype.draw = function () {
  powerupjs.GameObjectGrid.prototype.update.call(this);
  if (powerupjs.Game.gameWorld.map.mode !== "nature_deco_editing") return;
  if (this.mode === "draw") {
    var t = new powerupjs.SpriteGameObject(
      sprites.nature[this.types[this.currentTypeIndex]].idle,
      1,
      0,
      ID.layer_overlays
    );
    t.position = this.tilePosition;
    t.draw();

    if (this.fruitSelected === true) {
      var fruits = new Array();
      for (var i in sprites.fruits) {
        fruits.push(i)
      };
      var currentFruit = fruits[this.currentFruitIndex];
      var fruit1 = new powerupjs.SpriteGameObject(sprites.fruits[currentFruit], 1, 0, ID.layer_overlays);
      fruit1.position = new powerupjs.Vector2(this.tilePosition.x + 20, this.tilePosition.y + 20);
      fruit1.draw()

      var fruit2 = new powerupjs.SpriteGameObject(sprites.fruits[currentFruit], 1, 0, ID.layer_overlays);
      fruit2.position = new powerupjs.Vector2(this.tilePosition.x, this.tilePosition.y + 10);
      fruit2.draw()

      var fruit3 = new powerupjs.SpriteGameObject(sprites.fruits[currentFruit], 1, 0, ID.layer_overlays);
      fruit3.position = new powerupjs.Vector2(this.tilePosition.x + 40, this.tilePosition.y + 10);
      fruit3.draw()
    }
  }
};
