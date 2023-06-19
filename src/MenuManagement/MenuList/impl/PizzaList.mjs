import MenuList from "../MenuList.mjs";
import deepCopy from "../../../Library/DeepCopy.mjs"

/* ----- 피자 리스트 ----- */ 
class PizzaList extends MenuList {
    static instance = null;

    constructor(...menus) { // 항상 동일한 객체 리턴 (singleton)
        if (!PizzaList.instance) {
            super(...menus);
            PizzaList.instance = this;
        }
        return PizzaList.instance;
    }

    // @Override
    // 피자 반환 (deep copy) (prototype pattern) -> 반환받은 피자에 토핑추가시 메뉴판이 변경되면 안됨
    getMenu(pizzaName) {
        return deepCopy(this.menuLists.get(pizzaName));
    }
}

export default PizzaList