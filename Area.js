function Area(index) {
  powerupjs.GameObjectList.call(this, ID.layer_objects);
  this.index = index
  this.add(new TileField(index))
  this.add(new BoundaryFeild(index))

  var objectFeild = new ObjectFeild(index);
  this.player = new Player()
  this.player.playAnimation('idle_front')
  objectFeild.add(this.player)

  this.add(objectFeild)

  this.add(new FrontTileField(index))
  this.add(new TerrainEditor(index))
  this.add(new BoundaryEditor(index))
  this.add(new NatureDecoEditor(index))
  this.add(new FlowerEditor(index))
  this.add(new WallEditor(index))


}

Area.prototype = Object.create(powerupjs.GameObjectList.prototype)

Area.prototype.update = function(delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
  this.player.position = powerupjs.Game.gameWorld.map.playerPosition
}