function Hamburger(type, calories, isSecretIngredient = false) {
  const CHEESECALORIES = 120;
  const TOMATOCALORIES = 20;
  const SECRETCALORIES = 100;
  let tomatosAmount = 0;
  let maxTomatosAmount = 2;
  let isCheeseAvailable = true;
  let isTomatoAvailable = true;
  let isSecretIngredientAvailable = true;
  let isSecretIngredientWasAdded = false;
  let isBited = false;
  let biteCounter = 0;
  const hasSecretIngredient = function() {
    if (isSecretIngredient) {
      isSecretIngredientAvailable = false;
      isSecretIngredientWasAdded = true;
      return SECRETCALORIES;
    } else {
      return 0;
    }
  };
  let totalCalories = calories + hasSecretIngredient();
  const biteMessage = function(ingredient) {
    console.log(`Sorry, you cannot add ${ingredient}`);
  }

  this.type = type.charAt(0).toUpperCase() + type.slice(1);
  this.getCalories = function() {
    return totalCalories;
  };
  this.setCalories = function(extraCalories){
    totalCalories = extraCalories;
  };
  this.addCheese = function() {
    if (isBited) {
      biteMessage('cheese');
    } else {
      if (isCheeseAvailable) {
        totalCalories += CHEESECALORIES;
        isCheeseAvailable = false;
        isSecretIngredientAvailable = false;
      } else {
        console.log(`Sorry, you can add cheese only once.`);
      }
    }
  };
  this.addTomato = function() {
    if (isBited) {
      biteMessage('tomato');
    } else {
      if (isTomatoAvailable) {
        totalCalories += TOMATOCALORIES;
        tomatosAmount += 1;
        isSecretIngredientAvailable = false;
        if (tomatosAmount >= maxTomatosAmount) {
          isTomatoAvailable = false;
        }
      } else {
        console.log(`Sorry, you can add tomato only twice.`);
      }
    }
  };
  this.addSecretIngredient = function() {
    if (isBited) {
      biteMessage('secret ingredient');
    } else {
      if (isSecretIngredientAvailable) {
        totalCalories += SECRETCALORIES;
        isSecretIngredientAvailable = false;
        isSecretIngredientWasAdded = true;
      } else {
        console.log((isSecretIngredientWasAdded) ? `Sorry, you can add secret ingredient only once.` : `Sorry, you can add secret ingredient only before another ingredient.`);
      }
    }
  };
  this.bite = function() {
    if (!isBited) {
      isBited = true;
    }
    biteCounter += 1;
  }
  this.info = function() {
    console.log(type.slice(1));
    return `${this.type} hamburger: ${isSecretIngredientWasAdded ? `with secret ingredient, ` : ``}${isCheeseAvailable ? `` : `with cheese, `}${tomatosAmount > 0 ? `with ${tomatosAmount} tomato, ` : ``}is bit ${biteCounter} times. Total calories: ${this.getCalories()}.`;
  }
}

// const myHamburger = new Hamburger('classic', 600);
// myHamburger.addSecretIngredient();
// myHamburger.addCheese();
// myHamburger.info();
// const hisHamburger = new Hamburger('spicy', 666);
// const herHamburger = new Hamburger('vegan', 400, true);
