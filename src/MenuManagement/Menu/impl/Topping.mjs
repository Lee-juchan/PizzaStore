import Menu from "../Menu.mjs";

/* ----- 토핑 (abstract) -----*/
class Topping extends Menu {
    constructor(name) {
        super(name);
    }
}

/* ----- 토핑 구현체 -----*/
class Cheese extends Topping {
    constructor() {
        super("cheese");
    }
}

class Pepperoni extends Topping {
    constructor() {
        super("pepperoni");
    }
}

class Potato extends Topping {
    constructor() {
        super("potato");

    }
}

class Olive extends Topping {
    constructor() {
        super("olive");

    }
}

class Pineapple extends Topping {
    constructor() {
        super("pineapple");

    }
}

export { Cheese, Pepperoni, Potato, Olive, Pineapple }