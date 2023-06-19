/* ----- 주문서 ----- */
class Order {
    customer;   // customer Obj { pk, paymentMethod, balance }
    menu;       // menu Obj { name, price }

    constructor(customer, menu) {
        this.customer = customer;
        this.menu = menu;
    }
}

export default Order