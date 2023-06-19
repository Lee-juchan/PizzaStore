import Order from "./Order.mjs";
import OrderList from "./OrderList.mjs";

/* ----- 주문 관리 ----- */ // Order Obj 단위로 변환해서 OrderList에 저장 (~= proxy pattern)
class OrderManagement {
    orderList; // OrderList Obj 저장

    constructor() {
        this.orderList = new OrderList();
    }

    // 주문 생성 : customer, menu 입력 -> Order Obj 생성 후 저장 (~= factory pattern)
    createOrder(customer, menu) {
        let order = new Order(customer, menu);
        this.orderList.addOrder(order);
    }

    // 주문 취소
    cancelOrder(customerPk) {
        this.orderList.removeOrder(customerPk);
    }

    // 주문 확인
    checkOrder(customerPk) {
        return this.orderList.getOrder(customerPk);
    }
}

// 주문관리 객체 생성
const orderManagement = new OrderManagement();

// 생성된 주문관리 객체 내보내기
export default orderManagement