import DeepCopy from "./Library/DeepCopy.mjs";
import PaymentTable from "./Constants/PaymentTable.mjs";

/*
    - 메뉴 관리
    
    : 메뉴판 출력, 메뉴 선택
*/

/* ----- 메뉴 ----- */
// 메뉴
class Menu { // ~= 추상 클래스
    name;
    price;

    constructor(name) {
        this.name = name;
        this.price = PaymentTable[name]; // 가격표에 따라 가격 부여
    }
}


// 토핑
class Topping extends Menu { // 부모 클래스
    constructor(name) {
        super(name);
    }
}

class Cheese extends Topping { // 자식 클래스
    constructor() { super("cheese"); }
}
class Pepperoni extends Topping {
    constructor() { super("pepperoni"); }
}
class Potato extends Topping {
    constructor() { super("potato"); }
}
class Olive extends Topping {
    constructor() { super("olive"); }
}
class Pineapple extends Topping {
    constructor() { super("pineapple"); }
}


// 피자
class Pizza extends Menu { // 부모 클래스
    toppings = []; // 토핑 추가목록 (bridge pattern)

    constructor(name, ...toppings) {
        super(name);
        this.toppings = toppings;
    }
}

class CheesePizza extends Pizza { // 자식 클래스
    constructor() { super("cheesePizza", new Cheese()); }
}
class PepperoniPizza extends Pizza {
    constructor() { super("pepperoniPizza", new Pepperoni()); }
}
class PotatoPizza extends Pizza {
    constructor() { super("potatoPizza", new Potato()); }
}


    // 확장성 _ 피자, 토핑 외의 다른 요리 추가가능
    class Spaghetti extends Menu { 
        constructor(name) { 
            super(name);
        }
    }



/* ----- 메뉴 리스트 ----- */
class MenuList { // 부모 클래스
    menuLists; // Map<menuName, menu> : 메뉴들 저장하는 리스트

    constructor(...menus) {
        this.menuLists = new Map();

        // 입력된 menus가 있으면 추가
        if(menus) {
            this.addMenu(...menus);
        }
    }

    // 메뉴 추가
    addMenu(...menus) {
        menus.forEach(menu => this.menuLists.set(menu.name, menu));
    }

    // 메뉴 삭제
    removeMenu(menuName) {
        this.menuLists.delete(menuName);
    }

    // 메뉴 반환 (얕은 복사) (flyweight pattern)
    getMenu(menuName) {
        return this.menuLists.get(menuName);
    }
}


// 피자 리스트
class PizzaList extends MenuList {
    
    // 항상 동일한 객체 리턴 (singleton)
    static instance;

    constructor(...menus) { // 첫 초기화만 인자입력 가능
        if (!PizzaList.instance) {
            super(...menus);
            PizzaList.instance = this;
        }
        return PizzaList.instance;
    }

    // (Override) 피자 반환 (깊은 복사) -> 피자에 토핑 추가하고 변경할때 원본(메뉴판)이 바뀌면 안됨
    getMenu(pizzaName) {
        return DeepCopy(this.menuLists.get(pizzaName));
    }
}

// 토핑 리스트
class ToppingList extends MenuList {

    // 항상 동일한 객체 리턴 (singleton)
    static instance;

    constructor(...menus) { // 첫 초기화만 인자입력 가능
        if (!ToppingList.instance) {
            super(...menus);
            ToppingList.instance = this;
        }
        return ToppingList.instance;
    }
}


    // 확장성 _ 피자, 토핑 리스트 외의 다른 메뉴 리스트 추가 가능
    class SpaghettiList extends MenuList {
        constructor(...menus) {
            super(...menus);
        }
    };



/* ----- 메뉴 관리 ----- */
class MenuManageMent {
    totalMenuLists; // ArrayList<menuList> : 메뉴 리스트들 저장하는 리스트

    // totalMenuLists [PizzaList[], ToppingList[], ...] : 피자, 토핑리스트는 순서고정, 나머지는 자율적으로 추가

    constructor(pizzaList, toppingList, ...menuLists) { 
        this.totalMenuLists = new Array(pizzaList, toppingList);

        // 입력된 menuLists가 있으면 추가
        if (menuLists) {
            this.totalMenuLists.push(...menuLists);
        }
    }

    // 전체 메뉴 출력
    printMenu() {
        this.totalMenuLists.forEach(function (menuList) {

            // 메뉴 리스트에 메뉴가 존재하면
            if(menuList.menuLists.size !== 0) {

                // 메뉴 리스트(클래스)명 출력
                console.log("----- " + menuList.constructor.name + " -----");
                
                // 순회하며 메뉴 이름, 가격 출력
                let menus = menuList.menuLists.values(); // value값(menu) Iterator반환
                for (let menu of menus) {
                    console.log(`${menu.name} : ${menu.price}`);
                }
            }
        })
        console.log("---------- END ----------");
    }


    // 일반 메뉴 선택
    _chooseMenu(menuName) {        
        let menu;
        
        // 모든 메뉴 리스트중에 해당 메뉴가 있는지 탐색
        this.totalMenuLists.forEach(function(menuList) {
            let temp = menuList.getMenu(menuName); // 있으면 메뉴, 없으면 undefined 반환

            if(temp) { 
                menu = temp;
            }
        });
        return menu;
    }

    // 피자 메뉴 선택
    _choosePizzaMenu(pizzaName, ...toppingNames) {

        // 피자 리스트(totalMenuLists[0])에서 pizza객체 찾기
        let pizza = this.totalMenuLists[0].getMenu(pizzaName); // prototype pattern (deepcopy해서 반환)
        
        // 토핑 리스트(totalMenuLists[1])에서 topping객체 찾고, pizza안에 넣기
        toppingNames.forEach(function (toppingName) {
            let topping = this.totalMenuLists[1].getMenu(toppingName); // 있으면 토핑, 없으면 undefined 반환

            if (topping) {
                pizza.toppings.push(topping);
            }
        }, this); // this = 해당 MenuManagement 객체

        return pizza;
    }

    // 받은 인자개수에 따라 함수를 구분해서 실행    / (js에는 오버로딩이 없다..)
    chooseMenu(...menuName) {
        if(arguments.length === 1) { // 일반메뉴 == 1
            return this._chooseMenu(...menuName);

        } else if(arguments.length > 1) { // 피자 + 토핑 > 1
            return this._choosePizzaMenu(...menuName);
        } 
    }
}

// 메뉴 리스트 생성
const pizzaList = new PizzaList(new CheesePizza(), new PepperoniPizza(), new PotatoPizza())
const toppingList = new ToppingList(new Cheese(), new Pepperoni(), new Potato(), new Olive(), new Pineapple());
const spaghettiList =  new SpaghettiList(new Spaghetti("spaghetti"));

// 메뉴관리 객체 생성
const menuManageMent = new MenuManageMent(pizzaList, toppingList, spaghettiList);


// 생성된 메뉴관리 객체 내보내기
export default menuManageMent; 