import Menu from "../Menu.mjs";

/*
    - 메뉴확장 예시

    1. Menu를 상속받아 (추상)음식 추가      -> ex) Spaghetti (abstract)
    2. 해당음식을 상속받아 음식구현         -> ex) TomatoSpaghetti
*/

/* ----- 스파게티 (abstract) ----- */
class Spaghetti extends Menu {
    constructor(name) {
        super(name);
    }
}

/* ----- 스파게티 구현체  ----- */
class TomatoSpaghetti extends Spaghetti {
    constructor() {
        super("tomatoSpaghetti");
    }
}



export { TomatoSpaghetti };