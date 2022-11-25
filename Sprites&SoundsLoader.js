var sprites = {};
var sounds = {};

powerupjs.Game.loadAssets = function () {
  var loadSprite = function (sprite, collisionMask) {
    return new SpriteSheet("Sprites/" + sprite /*, collisionMask*/);
  };

  var loadSound = function (sound, looping) {
    return new Sound("Sounds/" + sound, looping);
  };

  sprites.terrain_tiles = {
    normal: loadSprite("summer_tiles_normal@30.png"),
    path_edge: loadSprite("summer_tiles_path_edge@33.png"),
    path: loadSprite("summer_tiles_path@30.png"),
    water: loadSprite("summer_tiles_water@30.png"),
    edge: loadSprite("summer_tiles_edge@30.png"),
    path_edge_dirt: loadSprite("summer_tiles_path_edge_dirt@33.png"),
  };

  sprites.main_character = {
    idle: {
      front: loadSprite("character_main_idle_front.png"),
      back: loadSprite("character_main_idle_back.png"),
      right: loadSprite("character_main_idle_right.png"),
      left: loadSprite("character_main_idle_left.png"),
    },
    run: {
      front: loadSprite("character_main_walk_front@7.png"),
      back: loadSprite("character_main_walk_back@7.png"),
      right: loadSprite("character_main_walk_right@7.png"),
      left: loadSprite("character_main_walk_left@7.png"),
    },
  };

  sprites.nature = {
    oak_tree: {
      shake: loadSprite("tree_summer_oak_shake@4.png"),
      idle: loadSprite("tree_summer_oak_idle.png"),
    },
    pine_tree: {
      shake: loadSprite("tree_summer_pine_shake@4.png"),
      idle: loadSprite("tree_summer_pine_idle.png"),
    },
    green_bush: {
      idle: loadSprite("bush_summer_green.png")
    },
    darkgreen_bush: {
      idle: loadSprite("bush_summer_darkgreen.png")
    },
    rock1: {
      idle: loadSprite("rock1.png")
    },
    rock2: {
      idle: loadSprite("rock2.png")
    }
  };

  sprites.flowers = {
    'tulips': loadSprite('flowers_tulips@7.png'),
    'roses': loadSprite('flowers_roses@7.png'),
    'misc': loadSprite("flowers_misc@7.png"),
    'weeds': loadSprite('weeds@2.png')
  }

  sprites.walls = {
    'oak_fence': loadSprite("oak_fence@17.png"),
    'stone_wall': loadSprite('stone_wall@15.png')
  }

  sprites.extras = {
    boundary: loadSprite("boundary.png"),
  };
};
