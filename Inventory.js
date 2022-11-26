function Inventory() {
  powerupjs.GameObjectList.call(this, ID.layer_overlays, ID.inventory);

  this.mode = 'items';

  this.frame = new powerupjs.SpriteGameObject(sprites.inventory['tabs'].slot1, 1, 0, ID.layer_objects);
  this.frame.position = new powerupjs.Vector2(300, 100)
  this.add(this.frame)

  this.buttons = new powerupjs.GameObjectList(ID.layer_overlays);
  this.itemsButton = new powerupjs.SpriteGameObject(sprites.inventory['icons'].items, 1, 0, ID.layer_overlays)
  this.itemsButton.position = new powerupjs.Vector2(650, 160)
  this.buttons.add(this.itemsButton)
  this.projectsButton = new powerupjs.SpriteGameObject(sprites.inventory['icons'].projects, 1, 0, ID.layer_overlays)
  this.projectsButton.position = new powerupjs.Vector2(715, 175)
  this.buttons.add(this.projectsButton)
  this.add(this.buttons)

  var backdrop = new powerupjs.SpriteGameObject(sprites.inventory['backdrops'].summer, 1, 0, ID.layer_overlays);
  backdrop.position = new powerupjs.Vector2(408, 303);
  this.add(backdrop)

  var paperDoll = new powerupjs.SpriteGameObject(sprites.main_character['idle'].front, 1.15, 0, ID.layer_overlays_1);
  paperDoll.origin = new powerupjs.Vector2(paperDoll.width / 2, paperDoll.height / 2)
  paperDoll.position = new powerupjs.Vector2(387, 330);
  this.add(paperDoll)

  this.itemGrid = new powerupjs.GameObjectGrid(3, 9, ID.layer_overlays);
  this.itemGrid.cellWidth = 63;
  this.itemGrid.cellHeight = 66;
  this.itemGrid.position = new powerupjs.Vector2(585, 295)
  // for (var i=0; i<this.itemGrid.gridLength; i++) {
  //   var col = Math.floor(i / this.itemGrid.columns);
  //   var row = i % this.itemGrid.columns;
  //   var items = new Array();
  //   for (var k in sprites.items) {
  //     items.push(k)
  //   }
  //   var randInt = Math.floor(Math.random() * items.length)
  //   var item = new powerupjs.SpriteGameObject(sprites.items[items[randInt]], 1, 0, ID.layer_overlays);
  //   this.itemGrid.addAt(item, row, col)
  // }
}

Inventory.prototype = Object.create(powerupjs.GameObjectList.prototype)

Inventory.prototype.draw = function() {
  powerupjs.GameObjectList.prototype.draw.call(this);

  if (this.mode === 'items') {
    this.itemGrid.draw()
  }
  
}

Inventory.prototype.update = function(delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta)
  if (this.itemsButton.boundingBox.contains(powerupjs.Mouse.position) && powerupjs.Mouse._left.pressed) {
    for (var i=0; i<this.buttons.listLength; i++) {
      this.buttons.at(i).position.y = 175
    }
    this.mode = 'items'
    this.itemsButton.position.y = 160
    this.frame.sprite = sprites.inventory['tabs'].slot1
  }
  if (this.projectsButton.boundingBox.contains(powerupjs.Mouse.position) && powerupjs.Mouse._left.pressed) {
    for (var i=0; i<this.buttons.listLength; i++) {
      this.buttons.at(i).position.y = 175

    }
    this.mode = 'projects'
    this.projectsButton.position.y = 160
    this.frame.sprite = sprites.inventory['tabs'].slot2
  }

  if (this.mode === 'items') {
    this.itemGrid.update(delta);
  }

}