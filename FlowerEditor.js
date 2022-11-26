function FlowerEditor(areaIndex) {
  powerupjs.GameObjectGrid.call(this, 60, 100, ID.layer_overlays);
  this.cellWidth = 16;
  this.cellHeight = 16;
  this.tilePosition = new powerupjs.Vector2(0, 0);
  this.types = new Array();
  for (let i in sprites.flowers) {
    this.types.push(i);
  }
  this.currentTypeIndex = 0;
  this.currentSheetIndex = 0;
  this.mode = "draw";
}

FlowerEditor.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

FlowerEditor.prototype.update = function (delta) {
  powerupjs.GameObjectGrid.prototype.update.call(this, delta);
  if (powerupjs.Game.gameWorld.map.mode !== "flower_deco_editing") return;
  this.tilePosition.x =
    Math.floor(powerupjs.Mouse.position.x / this.cellWidth) * this.cellWidth;
  this.tilePosition.y =
    Math.floor(powerupjs.Mouse.position.y / this.cellHeight) * this.cellHeight;
  this.currentNumberSheetElements =
    sprites.flowers[this.types[this.currentTypeIndex]].nrSheetElements;
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
      this.currentTypeIndex = this.types.length - 1;
    }
  }

  if (powerupjs.Keyboard.pressed(38)) {
    this.currentSheetIndex++;
    if (this.currentSheetIndex > this.currentNumberSheetElements - 1) {
      this.currentSheetIndex = 0;
    }
  }

  if (powerupjs.Keyboard.pressed(40)) {
    this.currentSheetIndex--;
    if (this.currentSheetIndex < 0) {
      this.currentSheetIndex = this.currentNumberSheetElements - 1;
    }
  }

  var area = this.parent;
  var feild = area.find(ID.objects);
  if (powerupjs.Mouse._left.pressed) {
    if (this.mode === "draw") {
      var decoration = new Flower(
        this.types[this.currentTypeIndex],
        new powerupjs.Vector2(
          this.tilePosition.x / this.cellWidth,
          this.tilePosition.y / this.cellHeight
        ),
        this.currentSheetIndex
      );
      decoration.position = new powerupjs.Vector2(
        this.tilePosition.x,
        this.tilePosition.y
      );
      feild.add(decoration);
    } else if (this.mode === "erase") {
      for (var i = 0; i < feild.gameObjects.length; i++) {
        var decoration = feild.gameObjects[i];
        if (decoration === undefined) continue;
        if (decoration.boundingBox.contains(powerupjs.Mouse._position)) {
          feild.gameObjects[i] = undefined;
        }
      }
    }
    this.save();
  }
};

FlowerEditor.prototype.save = function () {
  var all = "";
  for (var k = 0; k < 3; k++) {
    var area = powerupjs.Game.gameWorld.map.areas[k];
    var decorations = area.find(ID.objects);
    var fullString = "|" + k + "|";
    for (var i = 0, l = decorations.gameObjects.length; i < l; ++i) {
      if (
        decorations.gameObjects[i] === undefined ||
        decorations.gameObjects[i] === null
      )
        continue;
      var object = decorations.gameObjects[i];
      if (object.type === "nature") {
        var string =
          object.type +
          "/" +
          object.spriteType +
          "/" +
          object.index.x +
          "/" +
          object.index.y +
          ",";
      } else if (object.type === "flower") {
        var string =
          object.type +
          "/" +
          object.spriteType +
          "/" +
          object.sheetIndex +
          "/" +
          object.index.x +
          "/" +
          object.index.y +
          ",";
      } else {
        var string = undefined + ",";
      }
      fullString += string;
    }

    all += fullString;
  }

  localStorage.objects = all;
};

FlowerEditor.prototype.draw = function () {
  powerupjs.GameObjectGrid.prototype.update.call(this);
  if (powerupjs.Game.gameWorld.map.mode !== "flower_deco_editing") return;
  if (this.mode === "draw") {
    var t = new powerupjs.SpriteGameObject(
      sprites.flowers[this.types[this.currentTypeIndex]],
      1,
      0,
      ID.layer_overlays
    );
    t.sheetIndex = this.currentSheetIndex;
    t.position = this.tilePosition;
    t.draw();
  }
};
