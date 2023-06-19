import MenuList from "../MenuList.mjs";

/*
    - 메뉴리스트 확장 예시

    0. Menu를 상속받아 음식 추가                -> ex) Spaghetti <- TomatoSpaghetti..
    1. MenuList를 상속받아 음식리스트 추가      -> ex) SpaghettiList
    2. 해당음식을 해당 음식리스트에 저장
*/

/* ----- 스파게티 리스트 ----- */ 
class SpaghettiList extends MenuList {
    constructor(...menus) {
        super(...menus);
    }
};

export default SpaghettiList