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
    tend: {
      front: loadSprite("character_main_tend_front@5.png")
    }
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
      idle: loadSprite("bush_summer_green.png"),
    },
    darkgreen_bush: {
      idle: loadSprite("bush_summer_darkgreen.png"),
    },
    rock1: {
      idle: loadSprite("rock1.png"),
    },
    rock2: {
      idle: loadSprite("rock2.png"),
    },
  };

  sprites.flowers = {
    tulips: loadSprite("flowers_tulips@7.png"),
    roses: loadSprite("flowers_roses@7.png"),
    misc: loadSprite("flowers_misc@7.png"),
    weeds: loadSprite("weeds@2.png"),
  };

  sprites.walls = {
    oak_fence: loadSprite("oak_fence@17.png"),
    stone_wall: loadSprite("stone_wall@15.png"),
  };

  sprites.inventory = {
    frame: loadSprite("inventory_layout.png"),
    tabs: {
      slot1: loadSprite("inventory_tab1.png"),
      slot2: loadSprite("inventory_tab2.png"),
    },
    icons: {
      items: loadSprite('items_icon.png'),
      projects: loadSprite("projects_icon.png")
    },
    backdrops: {
      summer: loadSprite("inventory_summer_backdrop.png")
    }
  };

  sprites.items = {
    carrot_plant: loadSprite('items_carrot.png'),
    tomato_plant: loadSprite('item_tomato.png'),
    wheat_plant: loadSprite('item_wheat.png'),
    potato_plant: loadSprite('item_potato.png'),
    watermelon_plant: loadSprite('item_watermelon.png'),
    strawberry_plant: loadSprite('item_strawberry.png'),
    cabbage_plant: loadSprite('item_cabbage.png'),
    apple_plant: loadSprite('item_apple.png'),
    avocado_plant: loadSprite('item_avocado.png'),
    cherry_plant: loadSprite('item_cherry.png'),
    lemon_plant: loadSprite('item_lemon.png'),
    orange_plant: loadSprite('item_orange.png'),
    peach_plant: loadSprite('item_peach.png'),
    pear_plant: loadSprite('item_pear.png'),
    plum_plant: loadSprite('item_plum.png'),
    pumpkin_plant: loadSprite('item_pumpkin.png'),
    radish_plant: loadSprite('item_radish.png'),
    carrot_seeds: loadSprite('item_seeds_carrot.png'),
    tomato_seeds: loadSprite("item_seeds_tomato.png"),
    strawberry_seeds: loadSprite("item_seeds_strawberry.png")

    
  }

  sprites.fruits = {
    carrot: loadSprite('carry_item_carrot.png'),
    tomato: loadSprite('carry_item_tomato.png'),
    wheat: loadSprite('carry_item_wheat.png'),
    potato: loadSprite('carry_item_potato.png'),
    watermelon: loadSprite('carry_item_watermelon.png'),
    strawberry: loadSprite('carry_item_strawberry.png'),
    cabbage: loadSprite('carry_item_cabbage.png'),
    apple: loadSprite('carry_item_apple.png'),
    avocado: loadSprite('carry_item_avocado.png'),
    cherry: loadSprite('carry_item_cherry.png'),
    lemon: loadSprite('carry_item_lemon.png'),
    orange: loadSprite('carry_item_orange.png'),
    peach: loadSprite('carry_item_peach.png'),
    pear: loadSprite('carry_item_pear.png'),
    plum: loadSprite('carry_item_plum.png'),
    pumpkin: loadSprite('carry_item_pumpkin.png'),
    radish: loadSprite('carry_item_radish.png'),
  }

  sprites.seeds = {
    carrot_seeds: loadSprite("plant_seeds_carrot.png"),
    tomato_seeds: loadSprite("plant_seeds_tomato.png"),
    strawberry_seeds: loadSprite("plant_seeds_strawberry.png")
  }

  sprites.crops = {
    carrot: loadSprite("crops_carrot@6.png"),
    tomato: loadSprite("crops_tomato@6.png"),
    strawberry: loadSprite("crops_strawberry@6.png")
  }

  sprites.carry_items = {
    carrot: loadSprite('carry_item_carrot.png'),
    tomato: loadSprite('carry_item_tomato.png'),
    wheat: loadSprite('carry_item_wheat.png'),
    potato: loadSprite('carry_item_potato.png'),
    watermelon: loadSprite('carry_item_watermelon.png'),
    strawberry: loadSprite('carry_item_strawberry.png'),
    cabbage: loadSprite('carry_item_cabbage.png'),
    apple: loadSprite('carry_item_apple.png'),
    avocado: loadSprite('carry_item_avocado.png'),
    cherry: loadSprite('carry_item_cherry.png'),
    lemon: loadSprite('carry_item_lemon.png'),
    orange: loadSprite('carry_item_orange.png'),
    peach: loadSprite('carry_item_peach.png'),
    pear: loadSprite('carry_item_pear.png'),
    plum: loadSprite('carry_item_plum.png'),
    pumpkin: loadSprite('carry_item_pumpkin.png'),
    radish: loadSprite('carry_item_radish.png')
  }

  sprites.extras = {
    boundary: loadSprite("boundary.png"),
    planting_marker: loadSprite('crop_place.png')
  };
};
