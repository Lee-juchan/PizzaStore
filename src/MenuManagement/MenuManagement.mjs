import { CheesePizza, PepperoniPizza, PotatoPizza } from "./Menu/impl/Pizza.mjs"
import { Cheese, Pepperoni, Potato, Olive, Pineapple } from "./Menu/impl/Topping.mjs";
import { TomatoSpaghetti } from "./Menu/impl/Spaghetti.mjs"

import PizzaList from "./MenuList/impl/PizzaList.mjs"
import ToppingList from "./MenuList/impl/ToppingList.mjs"
import SpaghettiList from "./MenuList/impl/SpaghettiList.mjs"


/* ----- 메뉴 관리 ----- */
class MenuManageMent {
    totalMenuLists; // ArrayList <menuList Obj> : 메뉴판들 저장하는 리스트 (= 전체 메뉴판)
    /*
        - 전체 메뉴판 내부
    
        totalMenuLists[0] = PizzaList
        totalMenuLists[1] = ToppingList

        totalMenuLists[2...34] = MenuList (나머지 메뉴판들)
    */

    // 생성자 : 입력된 메뉴판 추가
    constructor(pizzaList, toppingList, ...menuLists) { 
        this.totalMenuLists = new Array(pizzaList, toppingList);

        if (menuLists) {
            this.totalMenuLists.push(...menuLists);
        }
    }

    // 전체메뉴판 출력
    printMenu() {

        // 전체메뉴판 순회
        this.totalMenuLists.forEach(function (menuList) {
            if(menuList.menuLists.size !== 0) {

                // 메뉴 리스트명 출력
                console.log("----- " + menuList.constructor.name + " -----");
                
                // 각 메뉴판 순회 -> 메뉴이름, 가격 출력
                let menus = menuList.menuLists.values();
                for (let menu of menus) {
                    console.log(`${menu.name} : ${menu.price}`);
                }
            }
        })
        console.log("---------- END ----------");
    }


    // 일반메뉴 선택
    _chooseMenu(menuName) {
        let menu = null;
        
        // 전체메뉴판 순회 -> 각 메뉴판에서 해당메뉴 검색
        this.totalMenuLists.forEach(function(menuList) {
            let temp = menuList.getMenu(menuName); // 존재하면 menu Obj, 없으면 undefined 반환

            if(temp) { 
                menu = temp;
            }
        });
        return menu;
    }

    // 피자 토핑추가 메뉴 선택
    _choosePizzaMenu(pizzaName, ...toppingNames) {

        // 피자메뉴판 순회 -> pizza Obj 찾기
        let pizza = this.totalMenuLists[0].getMenu(pizzaName); // deepCopy -> (prototype pattern)
        
        // 토핑메뉴판 순회 -> topping Obj 찾고, pizza Obj안에 넣기
        toppingNames.forEach(function (toppingName) {
            let topping = this.totalMenuLists[1].getMenu(toppingName); // 있으면 topping Obj, 없으면 undefined 반환

            if (topping) {
                pizza.toppings.push(topping);
            }
        }, this); // this = MenuManagement Obj

        return pizza;
    }

    // 종합메뉴 선택 (~= Overroding)                            / js에는 오버로딩이 없음
    chooseMenu(...menuName) {
        if(arguments.length === 1) { // 일반메뉴 === 1
            return this._chooseMenu(...menuName);

        } else if(arguments.length > 1) { // 피자 + 토핑추가 > 1
            return this._choosePizzaMenu(...menuName);
        } 
    }
}


// 메뉴 리스트 생성
const pizzaList = new PizzaList(new CheesePizza(), new PepperoniPizza(), new PotatoPizza())
const toppingList = new ToppingList(new Cheese(), new Pepperoni(), new Potato(), new Olive(), new Pineapple());
const spaghettiList =  new SpaghettiList(new TomatoSpaghetti());

// 메뉴관리 객체 생성
const menuManageMent = new MenuManageMent(pizzaList, toppingList, spaghettiList);

// 생성된 메뉴관리 객체 내보내기
export default menuManageMent;