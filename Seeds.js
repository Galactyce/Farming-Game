function SeedPacket(type) {
  powerupjs.SpriteGameObject.call(this, sprites.seeds[type], 1, 0, ID.layer_background);
  this.type = 'seeds';
  this.sprite_type = type
}

SeedPacket.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

SeedPacket.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);


 
}