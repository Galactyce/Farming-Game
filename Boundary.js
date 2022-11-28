function Boundary(index) {
  powerupjs.SpriteGameObject.call(
    this,
    sprites.extras["boundary"],
    1,
    0,
    ID.layer_objects
  );
  this.index = index;
}

Boundary.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Boundary.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  if (
    powerupjs.Game.gameWorld.map.mode !== "boundary_editing" &&
    powerupjs.Game.gameWorld.specialMode !== "interior_boundary_editing"
  )
    this.visible = false;
  else this.visible = true;
  
};
