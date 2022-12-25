function Inventory() {
  powerupjs.GameObjectList.call(this, ID.layer_overlays, ID.inventory);
  this.mode = "items";

  this.frame = new powerupjs.SpriteGameObject(
    sprites.inventory["tabs"].slot1,
    1,
    0,
    ID.layer_objects
  );
  this.frame.position = new powerupjs.Vector2(300, 100);
  this.add(this.frame);

  this.buttons = new powerupjs.GameObjectList(ID.layer_overlays);
  this.itemsButton = new powerupjs.SpriteGameObject(
    sprites.inventory["icons"].items,
    1,
    0,
    ID.layer_overlays
  );
  this.itemsButton.position = new powerupjs.Vector2(650, 160);
  this.buttons.add(this.itemsButton);
  this.projectsButton = new powerupjs.SpriteGameObject(
    sprites.inventory["icons"].projects,
    1,
    0,
    ID.layer_overlays
  );
  this.projectsButton.position = new powerupjs.Vector2(715, 175);
  this.buttons.add(this.projectsButton);

  if (this.mode === "selling") {
  }

  this.backdrop = new powerupjs.SpriteGameObject(
    sprites.inventory["backdrops"].summer,
    1,
    0,
    ID.layer_overlays
  );
  this.backdrop.position = new powerupjs.Vector2(408, 303);

  this.paperDoll = new powerupjs.SpriteGameObject(
    sprites.main_character["idle"].front,
    1.15,
    0,
    ID.layer_overlays_1
  );
  this.paperDoll.origin = new powerupjs.Vector2(
    this.paperDoll.width / 2,
    this.paperDoll.height / 2
  );
  this.paperDoll.position = new powerupjs.Vector2(387, 330);

  this.itemGrid = new powerupjs.GameObjectGrid(3, 9, ID.layer_overlays);
  this.itemGrid.cellWidth = 63;
  this.itemGrid.cellHeight = 66;
  this.itemGrid.position = new powerupjs.Vector2(585, 295);
  this.selected = "none";
  this.cropSelected = "none";
  var count = 0;
  if (localStorage.inventory === undefined) {
    for (var i = 0; i < this.itemGrid.gridLength; i++) {
      if (
        this.itemGrid.atIndex(i) === undefined ||
        this.itemGrid.atIndex(i) === null
      ) {
        var col = Math.floor(i / this.itemGrid.columns);
        var row = i % this.itemGrid.columns;
        var item = new powerupjs.SpriteGameObject(
          sprites.items["wheat"],
          1,
          0,
          ID.layer_overlays
        );
        this.itemGrid.addAt(item, row, col);
        count++;
        if (count >= 15) break;
      }
    }
  }
  this.moneyLabel = new powerupjs.SpriteGameObject(
    sprites.extras["label"],
    1,
    0,
    ID.layer_overlays_1
  );

  this.moneyLabel.position = new powerupjs.Vector2(87, 130);

  this.rewardLabel = new powerupjs.SpriteGameObject(
    sprites.extras["label"],
    1,
    0,
    ID.layer_overlays_1
  );
  this.rewardLabel.position = new powerupjs.Vector2(87, 330);

  this.sellingSelected = new Array();
  this.reward = 0
  this.load();
}

Inventory.prototype = Object.create(powerupjs.GameObjectList.prototype);

Inventory.prototype.load = function () {
  var inventoryInfo = localStorage.inventory;
  if (inventoryInfo !== undefined) {
    var items = inventoryInfo.split(",");
    for (var i = 0; i < items.length - 1; i++) {
      var col = Math.floor(i / this.itemGrid.columns);
      var row = i % this.itemGrid.columns;
      if (items[i] !== "null" && items[i] !== "undefined") {
        var imgInfo = items[i].split("/");
        var imgType = imgInfo[1].split("_"); // Splits the image file name into sections
        var name = imgType[1].split(".");
        console.log(name[0]);
        var item = new powerupjs.SpriteGameObject(
          sprites.items[name[0]],
          1,
          0,
          ID.layer_overlays
        );

        this.itemGrid.addAt(item, row, col);
      }
    }
  }
};

Inventory.prototype.save = function () {
  var fullString = "";
  for (var i = 0; i < this.itemGrid.gridLength; i++) {
    var item = this.itemGrid.atIndex(i);
    var string = "";
    console.log(item);
    if (item === null || item === undefined) {
      string = null;
    } else {
      string = item.sprite.imgName;
    }
    fullString += string + ",";
  }
  localStorage.inventory = fullString;
};

Inventory.prototype.draw = function () {
  powerupjs.GameObjectList.prototype.draw.call(this);

  if (this.visible) {
    this.moneyLabel.draw();
    var money = new powerupjs.Label();
    money.position = new powerupjs.Vector2(167, 140);
    money.text = powerupjs.Game.gameWorld.cash;
    money._align = "center";
    money.draw();
    var moneySprite = new powerupjs.SpriteGameObject(
      sprites.extras["coin"],
      0.8,
      0,
      ID.layer_overlays_1
    );
    moneySprite.position = new powerupjs.Vector2(245, 174);
    moneySprite.draw();
  }

  if (
    (this.mode === "items" && this.visible) ||
    powerupjs.Game.gameWorld.selling
  ) {
    this.itemGrid.draw();
  }
  if (this.mode !== "selling" && this.visible) {
    this.buttons.draw();
    this.backdrop.draw();
    this.paperDoll.draw();
  }
  if (this.mode === "selling" && this.visible) {
    this.frame.sprite = sprites.inventory["selling"];
    this.frame.position = new powerupjs.Vector2(345, 237);
    this.itemGrid.position = new powerupjs.Vector2(385, 295);

    this.rewardLabel.draw();

    var rewardText = new powerupjs.Label();
    rewardText.position = new powerupjs.Vector2(147, 340);
    rewardText.text = "+" + this.reward;
    rewardText.draw()

    for (var i = 0; i < this.sellingSelected.length; i++) {
      var itemIndex = this.sellingSelected[i];
      var marker = new powerupjs.SpriteGameObject(
        sprites.extras["item_select"],
        1,
        0,
        ID.layer_overlays_1
      );
      var row = Math.floor(this.sellingSelected[i] / this.itemGrid.columns);
      var col = this.sellingSelected[i] % this.itemGrid.columns;
      marker.position = new powerupjs.Vector2(
        this.itemGrid.position.x + col * this.itemGrid.cellWidth,
        this.itemGrid.position.y + row * this.itemGrid.cellHeight
      );
      marker.draw();
    }
  } else {
    this.frame.sprite = sprites.inventory["tabs"].slot1;
    this.frame.position = new powerupjs.Vector2(300, 100);
    this.itemGrid.position = new powerupjs.Vector2(585, 295);
  }
};

Inventory.prototype.update = function (delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
  if (this.mode !== "selling" && this.visible) {
    this.buttons.update(delta);
    this.backdrop.update(delta);
    this.paperDoll.update(delta);
  }

  if (this.mode === "selling") {
    for (var i = 0; i < this.itemGrid.gridLength; i++) {
      var thing = this.itemGrid.atIndex(i);
      if (thing === null || thing === undefined) continue;
      if (thing.sprite === null || thing.sprite === undefined) continue;
      var sprite = thing.sprite.imgName;
      var imgInfo = sprite.split("/");
      var imgType = imgInfo[1].split("_"); // Splits the image file name into sections
      var name = imgType[1].split("."); // Remove .png
      if (
        thing.boundingBox.contains(powerupjs.Mouse.position) &&
        powerupjs.Mouse._left.pressed
      ) {
        this.sellingSelected.push(i);
        this.reward += sellPricing[name[0]];
      }
    }
    if (powerupjs.Keyboard.pressed(13)) {
      for (var i = 0; i < this.sellingSelected.length; i++) {
        var thing = this.itemGrid.atIndex(this.sellingSelected[i]);
        var sprite = thing.sprite.imgName;
        var imgInfo = sprite.split("/");
        var imgType = imgInfo[1].split("_"); // Splits the image file name into sections
        var name = imgType[1].split("."); // Remove .png
        powerupjs.Game.gameWorld.cash += sellPricing[name[0]];
        thing.visible = false;
        thing = null;
      }
      this.visible = false;
      this.open = false;

      powerupjs.Game.gameWorld.selling = false
      this.mode = 'items'
      this.reward = 0;
      this.sellingSelected = new Array()
    }
  }

  if (
    this.itemsButton.boundingBox.contains(powerupjs.Mouse.position) &&
    powerupjs.Mouse._left.pressed
  ) {
    for (var i = 0; i < this.buttons.listLength; i++) {
      this.buttons.at(i).position.y = 175; // Reset icon positions
    }
    this.mode = "items";
    this.itemsButton.position.y = 160; // Change item icon position
    this.frame.sprite = sprites.inventory["tabs"].slot1;
  }
  if (
    this.projectsButton.boundingBox.contains(powerupjs.Mouse.position) &&
    powerupjs.Mouse._left.pressed
  ) {
    for (var i = 0; i < this.buttons.listLength; i++) {
      this.buttons.at(i).position.y = 175; // Reset icon positions
    }
    this.mode = "projects";
    this.projectsButton.position.y = 160; // Change projects icon position
    this.frame.sprite = sprites.inventory["tabs"].slot2;
  }

  if (this.mode === "items" && this.visible) {
    this.itemGrid.update(delta);
  }
  var player = powerupjs.Game.gameWorld.map.areas[
    powerupjs.Game.gameWorld.map.currentAreaIndex
  ].find(ID.player);
  for (var i = 0; i < this.itemGrid.gridLength; i++) {
    var thing = this.itemGrid.atIndex(i);
    if (thing === null || thing === undefined) continue;
    if (thing.sprite === null || thing.sprite === undefined) continue;
    var sprite = thing.sprite.imgName;
    var imgInfo = sprite.split("/");
    var imgType = imgInfo[1].split("_"); // Splits the image file name into sections

    if (
      thing.boundingBox.contains(powerupjs.Mouse.position) &&
      powerupjs.Mouse._left.pressed
    ) {
      console.log(imgType);
      if (imgType[1] === "seeds") {
        this.selected = "planting";
        var parts = imgType[2].split("."); // 2 objects in list: imgName & ".png"
        this.cropSelected = parts[0]; // Extracts crop name by file name
        this.visible = false; // Hide inventory
        thing.visible = false; // Hide seed packet
        this.itemGrid.gameObjects[i] = null; // Set the item to null
        break;
      }
    }
  }

  if (this.selected === "planting" && this.cropSelected !== "none") {
    var tile = new powerupjs.Vector2(
      Math.floor((player.position.x + 15) / 32) * 32,
      Math.floor((player.position.y + 20) / 32) * 32
    ); // Place of tile
    var terrainTiles = powerupjs.Game.gameWorld.map.areas[
      powerupjs.Game.gameWorld.map.currentAreaIndex
    ].find(ID.tiles);
    var tileIndex = terrainTiles.at(
      Math.floor((player.position.x + 15) / 32),
      Math.floor((player.position.y + 20) / 32)
    );
    var terrainType = tileIndex.terrainType; // Dirt? Path? Normal?

    var tileSheetIndex = tileIndex.sheetIndex;

    if (
      powerupjs.Keyboard.pressed(32) &&
      terrainType === "path_edge_dirt" &&
      (tileSheetIndex === 5 || // Is the tile solid dirt?
        tileSheetIndex === 6 || // Is the tile solid dirt?
        tileSheetIndex === 7) && // Is the tile solid dirt?
      tileIndex.containsCrops === "false"
    ) {
      tileIndex.containsCrops = "true";
      player.mode = "tending";
      player.playAnimation("tend_front");
      var objects = powerupjs.Game.gameWorld.map.areas[
        powerupjs.Game.gameWorld.map.currentAreaIndex
      ].find(ID.objects);

      objects.add(new Crop(this.cropSelected, tile, 0));
      this.selected = "none";
      powerupjs.Game.gameWorld.saveObjects();
      // Save the crop to objects
      powerupjs.Game.gameWorld.map.areas[
        powerupjs.Game.gameWorld.map.currentAreaIndex
      ].terrainEditor.save();
      // Save the tile as containing crops
    }
  }
};
