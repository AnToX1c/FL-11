const MAX_PROBABILITY = 100;
class Fighter {
  constructor(data) {
    const TOTAL_HP = data.hp;
    let name = data.name;
    let damage = data.damage;
    let hp = data.hp;
    let agility = data.agility;
    let wins = 0;
    let losses = 0;
    this.getName = () => name;
    this.getDamage = () => damage;
    this.getAgility = () => agility;
    this.getHealth = () => hp;
    this.attack = defender => {
      const randomChance = Math.floor(Math.random() * (MAX_PROBABILITY + 1));
      if (randomChance < MAX_PROBABILITY - defender.getAgility()) {
        defender.dealDamage(damage);
        console.log(`${name} made ${damage} damage to ${defender.getName()}`);
      } else {
        console.log(`${name} attack missed`);
      }
    };
    this.dealDamage = hpToReduce => {
      const reducedHP = hp - hpToReduce;
      hp = reducedHP < 0 ? 0 : reducedHP;
    }
    this.logCombatHistory = () => console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
    this.heal = hpToAdd => {
      const addedHP = hp + hpToAdd;
      hp = addedHP > TOTAL_HP ? TOTAL_HP : addedHP;
    }
    this.addWin = () => wins++;
    this.addLoss = () => losses++;
  }
}
const battle = (fighter1, fighter2) => {
  if (fighter1.getHealth() <= 0 || fighter2.getHealth() <= 0) {
    console.log(`One of the fighters is dead and can't fight.`);
  } else {
    while (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
      fighter1.attack(fighter2);
      if (fighter2.getHealth() > 0) {
        fighter2.attack(fighter1);
      } 
    }
    if (fighter1.getHealth() <= 0) {
      console.log(`Battle is over. ${fighter1.getName()} is defeated.`);
      fighter1.addLoss();
      fighter2.addWin();
    }
    if (fighter2.getHealth() <= 0) {
      console.log(`Battle is over. ${fighter2.getName()} is defeated.`);
      fighter2.addLoss();
      fighter1.addWin();
    }
  }
};
