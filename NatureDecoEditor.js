function NatureDecoEditor(areaIndex) {
  powerupjs.GameObjectGrid.call(this, 60, 100, ID.layer_overlays);
  this.cellWidth = 16;
  this.cellHeight = 16;
  this.tilePosition = new powerupjs.Vector2(0, 0);
  this.types = new Array();
  for (let i in sprites.nature) {
    this.types.push(i)
  }
  this.currentTypeIndex = 0
  console.log(this.types)
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
  if (powerupjs.Keyboard.pressed(37)) {
    this.currentTypeIndex++;
    if (this.currentTypeIndex > this.types.length - 1) {
      this.currentTypeIndex = 0;
    }
  }

  if (powerupjs.Keyboard.pressed(39)) {
    this.currentTypeIndex--;
    if (this.currentTypeIndex < 0) {
      this.currentTypeIndex = this.types.length;
    }
  }

  var area = this.parent;
  var feild = area.find(ID.objects);
  if (powerupjs.Mouse._left.pressed) {
    if (this.mode === "draw") {
      var decoration = new NatureDecoration(
          this.types[this.currentTypeIndex],
          new powerupjs.Vector2(
            this.tilePosition.x / this.cellWidth,
            this.tilePosition.y / this.cellHeight
          )
      );
      decoration.position = new powerupjs.Vector2(this.tilePosition.x, this.tilePosition.y)
      feild.add(
        decoration
      );
    }
    else if (this.mode === 'erase') {
      for (var i=0; i<feild.gameObjects.length; i++) {
        var decoration = feild.gameObjects[i];
        if (decoration === undefined) continue
        console.log(decoration.boundingBox)
        if (decoration.boundingBox.contains(powerupjs.Mouse._position)) {
          feild.gameObjects[i] = undefined;
          
        }
      }
    }
    this.save()
  }
};

NatureDecoEditor.prototype.save = function () {
    var all = "";
    for (var k = 0; k < 3; k++) {
      var area = powerupjs.Game.gameWorld.map.areas[k];
      var decorations = area.find(ID.objects);
      var fullString = "|" + k + "|";
      for (var i = 0, l = decorations.gameObjects.length; i < l; ++i) {
        if (decorations.gameObjects[i] === undefined || decorations.gameObjects[i] === null)
          continue;
        var object = decorations.gameObjects[i];
        console.log(object)
        if (object.type === 'nature') {
        var string = object.type + "/" + object.spriteType + "/" + object.index.x + "/" + object.index.y + ",";
        }
        else {
          var string = undefined + ","
        }
        fullString += string;
      }
      all += fullString;
    }

    localStorage.objects = all;
  
  
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
  }
};
