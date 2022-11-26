function DroppedItem(type, item, destination) {
  powerupjs.SpriteGameObject.call(this, sprites.carry_items[type], 1, 0, ID.layer_objects);
  this.type = 'dropped_item';
  this.sprite_type = type
  this.item_type = typeof item !== "undefined" ? item : 'item';
  this.destination = destination

  this.time = 0

}

DroppedItem.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

DroppedItem.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  this.time += 270

  if (this.velocity.y === 0 && this.velocity.x === 0) {
  this.position.y += Math.sin(this.time) * 1.4;
  }
  if (this.destination !== undefined) {
    if (this.position.y < this.destination.y) {
      this.velocity.y = 100
    }
    else {
      this.velocity.y = 0;
      this.velocity.x = 0;
    }
  }
 
}