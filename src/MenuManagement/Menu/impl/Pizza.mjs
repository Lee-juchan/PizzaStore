import Menu from "../Menu.mjs";
import { Cheese, Pepperoni, Potato } from "./Topping.mjs"

/* ----- 피자 (abstract) ----- */
class Pizza extends Menu {
    toppings = []; // Array <topping Obj> : 토핑담는 리스트 (bridge pattern)

    constructor(name, ...toppings) {
        super(name);
        this.toppings = toppings;
    }
}

/* ----- 피자 구현체 ----- */
class CheesePizza extends Pizza {
    constructor() {
        super("cheesePizza", new Cheese());
    }
}

class PepperoniPizza extends Pizza {
    constructor() {
        super("pepperoniPizza", new Pepperoni());
    }
}

class PotatoPizza extends Pizza {
    constructor() {
        super("potatoPizza", new Potato());
    }
}

export { CheesePizza, PepperoniPizza, PotatoPizza }