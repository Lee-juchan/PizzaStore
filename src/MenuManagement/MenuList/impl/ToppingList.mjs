import MenuList from "../MenuList.mjs";

/* ----- 토핑 리스트 ----- */ 
class ToppingList extends MenuList {
    static instance = null;
    
    constructor(...menus) { // 항상 동일한 객체 리턴 (singleton)
        if (!ToppingList.instance) {
            super(...menus);
            ToppingList.instance = this;
        }
        return ToppingList.instance;
    }
}

export default ToppingList