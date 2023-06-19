import PaymentTable from "../../Library/Constants/PaymentTable.mjs";

/*
    - 상속관계

                    Menu  ----------------- abstract
       ______________|______________
      |        |          |        |
    Pizza   Topping   Spaghetti   ...   --- abstract
     |        |          |         |
    ...      ...        ...       ...   --- implements

*/

/* ----- 메뉴 (abstract) ----- */
class Menu {
    name;
    price;

    constructor(name) {
        this.name = name;
        this.price = PaymentTable[name]; // Menu의 자손들은 가격표에 따라 가격 일괄부여
    }
}

export default Menu;