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
      front: loadSprite("character_main_tend_front@5.png"),
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
      items: loadSprite("items_icon.png"),
      projects: loadSprite("projects_icon.png"),
    },
    backdrops: {
      summer: loadSprite("inventory_summer_backdrop.png"),
    },
    selling: loadSprite("selling_grid.png")
  };

  sprites.items = {
    carrot: loadSprite("item_carrot.png"),
    tomato: loadSprite("item_tomato.png"),
    wheat: loadSprite("item_wheat.png"),
    potato: loadSprite("item_potato.png"),
    watermelon: loadSprite("item_watermelon.png"),
    strawberry: loadSprite("item_strawberry.png"),
    cabbage: loadSprite("item_cabbage.png"),
    apple: loadSprite("item_apple.png"),
    avocado: loadSprite("item_avocado.png"),
    cherry: loadSprite("item_cherry.png"),
    lemon: loadSprite("item_lemon.png"),
    orange: loadSprite("item_orange.png"),
    peach: loadSprite("item_peach.png"),
    pear: loadSprite("item_pear.png"),
    plum: loadSprite("item_plum.png"),
    pumpkin: loadSprite("item_pumpkin.png"),
    eggplant: loadSprite("item_eggplant.png"),
    corn: loadSprite("item_corn.png"),
    radish: loadSprite("item_radish.png"),
    carrot_seeds: loadSprite("item_carrot_seeds.png"),
    tomato_seeds: loadSprite("item_tomato_seeds.png"),
    strawberry_seeds: loadSprite("item_strawberry_seeds.png"),
    cabbage_seeds: loadSprite("item_cabbage_seeds.png"),
    corn_seeds: loadSprite("item_corn_seeds.png"),
    eggplant_seeds: loadSprite("item_eggplant_seeds.png"),
    potato_seeds: loadSprite("item_potato_seeds.png"),
    pumpkin_seeds: loadSprite("item_pumpkin_seeds.png"),
    radish_seeds: loadSprite("item_radish_seeds.png"),
    watermelon_seeds: loadSprite("item_watermelon_seeds.png"),
    wheat_seeds: loadSprite("item_wheat_seeds.png"),
    milk: loadSprite("item_milk.png"),
    wool: loadSprite("item_wool.png"),
    goatmilk: loadSprite("item_goatmilk.png"),
    butter: loadSprite("item_butter.png"),
    cheese: loadSprite("item_cheese.png"),
    goatcheese: loadSprite("item_goatcheese.png"),
    mozzerelacheese: loadSprite("item_mozzerelacheese.png"),
    yarn: loadSprite("item_yarn.png"),
    cloth: loadSprite("item_cloth.png")
  };

  sprites.fruits = {
    carrot: loadSprite("carry_item_carrot.png"),
    tomato: loadSprite("carry_item_tomato.png"),
    wheat: loadSprite("carry_item_wheat.png"),
    potato: loadSprite("carry_item_potato.png"),
    watermelon: loadSprite("carry_item_watermelon.png"),
    strawberry: loadSprite("carry_item_strawberry.png"),
    cabbage: loadSprite("carry_item_cabbage.png"),
    apple: loadSprite("carry_item_apple.png"),
    avocado: loadSprite("carry_item_avocado.png"),
    cherry: loadSprite("carry_item_cherry.png"),
    lemon: loadSprite("carry_item_lemon.png"),
    orange: loadSprite("carry_item_orange.png"),
    peach: loadSprite("carry_item_peach.png"),
    pear: loadSprite("carry_item_pear.png"),
    plum: loadSprite("carry_item_plum.png"),
    pumpkin: loadSprite("carry_item_pumpkin.png"),
    radish: loadSprite("carry_item_radish.png"),
  };

  sprites.seeds = {
    carrot_seeds: loadSprite("item_carrot_seeds.png"),
    tomato_seeds: loadSprite("item_tomato_seeds.png"),
    strawberry_seeds: loadSprite("item_strawberry_seeds.png"),
    cabbage_seeds: loadSprite("item_cabbage_seeds.png"),
    corn_seeds: loadSprite("item_corn_seeds.png"),
    eggplant_seeds: loadSprite("item_eggplant_seeds.png"),
    potato_seeds: loadSprite("item_potato_seeds.png"),
    pumpkin_seeds: loadSprite("item_pumpkin_seeds.png"),
    radish_seeds: loadSprite("item_radish_seeds.png"),
    watermelon_seeds: loadSprite("item_watermelon_seeds.png"),
    wheat_seeds: loadSprite("item_wheat_seeds.png"),
  };

  sprites.crops = {
    carrot: loadSprite("crops_carrot@6.png"),
    tomato: loadSprite("crops_tomato@6.png"),
    strawberry: loadSprite("crops_strawberry@6.png"),
    cabbage: loadSprite("crops_cabbage@6.png"),
    corn: loadSprite("crops_corn@6.png"),
    eggplant: loadSprite("crops_eggplant@6.png"),
    potato: loadSprite("crops_potato@6.png"),
    pumpkin: loadSprite("crops_pumpkin@6.png"),
    radish: loadSprite("crops_radish@6.png"),
    watermelon: loadSprite("crops_watermelon@6.png"),
    wheat: loadSprite("crops_wheat@6.png"),
  };

  sprites.carry_items = {
    carrot: loadSprite("carry_item_carrot.png"),
    tomato: loadSprite("carry_item_tomato.png"),
    wheat: loadSprite("carry_item_wheat.png"),
    potato: loadSprite("carry_item_potato.png"),
    watermelon: loadSprite("carry_item_watermelon.png"),
    strawberry: loadSprite("carry_item_strawberry.png"),
    cabbage: loadSprite("carry_item_cabbage.png"),
    apple: loadSprite("carry_item_apple.png"),
    avocado: loadSprite("carry_item_avocado.png"),
    cherry: loadSprite("carry_item_cherry.png"),
    lemon: loadSprite("carry_item_lemon.png"),
    orange: loadSprite("carry_item_orange.png"),
    peach: loadSprite("carry_item_peach.png"),
    pear: loadSprite("carry_item_pear.png"),
    plum: loadSprite("carry_item_plum.png"),
    pumpkin: loadSprite("carry_item_pumpkin.png"),
    radish: loadSprite("carry_item_radish.png"),
  };

  sprites.buildings = {
    barn: loadSprite("summer_building_barn.png"),
    barn2: loadSprite("summer_building_barn2.png"),
    market: loadSprite("summer_building_market.png"),

  };

  sprites.machines = {
    water_trough: {
      empty: loadSprite("empty_trough.png"),
      full: loadSprite("water_trough.png"),
    },
    food_trough: {
      empty: loadSprite("empty_trough.png"),
      full: loadSprite("food_trough.png"),
    },
    butter_churn: {
      idle: loadSprite("butter_churn_idle.png"),
      working: loadSprite("butter_churn_working@2.png"),
    },
    cheese_press: {
      idle: loadSprite("cheese_press_idle.png"),
      working: loadSprite("cheese_press_working@2.png"),
    },
    goat_cheese_press: {
      idle: loadSprite("cheese_press_idle.png"),
      working: loadSprite("goat_cheese_press_working@2.png")
    },
    mozzerela_cheese_press: {
      idle: loadSprite("cheese_press_idle.png"),
      working: loadSprite("mozzerela_cheese_press_working@2.png")
    },
    spindle: {
      idle: loadSprite('spindle_idle.png'),
      working: loadSprite("spindle_working@8.png")
    },
    clothmaker: {
      idle: loadSprite('clothmaker_idle.png'),
      working: loadSprite("clothmaker_working@34.png")
    }
  };

  sprites.animals = {
    cow: {
      front: loadSprite("cow_front_walk@4.png"),
      back: loadSprite("cow_back_walk@4.png"),
      right: loadSprite("cow_right_walk@4.png"),
      left: loadSprite("cow_left_walk@4.png"),
    },
    goat: {
      front: loadSprite("goat_front_walk@4.png"),
      back: loadSprite("goat_back_walk@4.png"),
      left: loadSprite("goat_right_walk@4.png"),
      right: loadSprite("goat_left_walk@4.png"),
    },
    sheep: {
      front: loadSprite("sheep_front_walk@4.png"),
      back: loadSprite("sheep_back_walk@4.png"),
      left: loadSprite("sheep_right_walk@4.png"),
      right: loadSprite("sheep_left_walk@4.png"),
    }
  };

  sprites.require_bubbles = {
    milk: loadSprite("requires_milk_bubble.png"),
    goatmilk: loadSprite("requires_goatmilk_bubble.png")

  }

  sprites.markers = {
    milk: loadSprite("milk_ready.png"),
    butter: loadSprite("butter_ready.png"),
    wool: loadSprite("wool_ready.png"),
    yarn: loadSprite("yarn_ready.png"),
    cheese: loadSprite("cheese_ready.png"),
    goatmilk: loadSprite("goat_milk_ready.png"),
    goatcheese: loadSprite("goat_cheese_ready.png"),
    mozzerelacheese: loadSprite("mozzerela_cheese_ready.png"),
    cloth: loadSprite("cloth_ready.png")
  };

  sprites.interiors = {
    barn: loadSprite("barn_area.png"),
    barn2: loadSprite("barn_area.png"),

  };

  sprites.extras = {
    coin: loadSprite("coin.png"),
    boundary: loadSprite("boundary.png"),
    planting_marker: loadSprite("crop_place.png"),
    timer_bubble: loadSprite("timer_bubble.png"),
    label: loadSprite("label.png"),
    item_select: loadSprite("item_select.png")
  };
};
