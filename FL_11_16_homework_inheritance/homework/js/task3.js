function Pokemon() {
  this.getType = function() {
    return this.type;
  };
  this.getSpecie = function() {
    return this.specie;
  };
  this.canFly = function() {
    return this.hasWings;
  };
  this.getPokemonType = function() {
    return this.constructor.name;
  };
}
Pokemon.prototype.constructor = Pokemon;

function Charmander() {
  Pokemon.call(this);
  this.type = 'Fire';
  this.specie = 'Lizard Pokémon';
  this.hasWings = false;

  this.evolve = function() {
    return new Charmeleon();
  }
}
Charmander.prototype.constructor = Charmander;

function Charmeleon() {
  Charmander.call(this);
  this.specie = 'Flame Pokémon';
  this.evolve = function() {
    return new Charizard();
  }
}
Charmeleon.prototype.constructor = Charmeleon;

function Charizard() {
  Charmeleon.call(this);
  this.hasWings = true;
  this.evolve = function() {
    return this;
  }
}
Charizard.prototype.constructor = Charizard;


function Pichu() {
  Pokemon.call(this);
  this.type = 'Electric';
  this.specie = 'Mouse Pokémon';
  this.hasWings = false;
  
  this.evolve = function() {
    return new Pikachu();
  };
}
Pichu.prototype.constructor = Pichu;

function Pikachu() {
  Pichu.call(this);
  this.evolve = function() {
    return new Raichu();
  };
}
Pikachu.prototype.constructor = Pikachu;

function Raichu() {
  Pikachu.call(this);
  this.evolve = function() {
    return this;
  };
}
Raichu.prototype.constructor = Raichu;
