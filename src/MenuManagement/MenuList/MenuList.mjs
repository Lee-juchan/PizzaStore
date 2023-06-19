/*
    - 상속관계

                          MenuList    ----------------- abstract
        _____________________|__________________
        |            |              |          |
    PizzaList   ToppingList   SpaghettiList   ...   --- implements

*/

/* ----- 메뉴 리스트 (abstract) ----- */
class MenuList {
    menuLists; // Map <menuName, menu Obj> : 음식을 저장하는 맵 (= 메뉴판)

    // 생성자 : 입력된 메뉴 추가
    constructor(...menus) {
        this.menuLists = new Map();

        if (menus) { // undefined가 아니면
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
    // 메뉴 반환(shallow copy) (flyWeight pattern)
    getMenu(menuName) {
        return this.menuLists.get(menuName);
    }
}

export default MenuList