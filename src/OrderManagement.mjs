/*
    - 주문 관리

    : 주문, 주문취소, 주문확인
*/

/* ----- 주문서 클래스 ----- */
class Order {
    customer;   // 고객 정보 : Customer 객체
    menu;       // 메뉴 정보 : Menu 객체

    constructor(customer, menu) {
        this.customer = customer;
        this.menu = menu;
    }
}

/* ----- 참고용 ----- */
// Customer 클래스
//     pk;
//     paymentMethod;
//     balance;

// Menu 클래스
//      name;
//      price;


/* ----- 주문 리스트 ----- */ 
class OrderList {
    orderLists; // Map <customerPk, Order> // 키는 order.customer.pk

    // 항상 동일한 객체 리턴 (singleton)
    static instance;

    constructor() {
        if(!OrderList.instance) {
            this.orderLists = new Map();
            OrderList.instance = this;
        }
        return OrderList.instance;
    }

    // 주문목록에 추가
    addOrder(order) {
        this.orderLists.set(order.customer.pk, order);
    }

    // 주문목록에서 삭제
    removeOrder(customerPk) {
        this.orderLists.delete(customerPk);
    }

    // 주문목록에서 검색
    getOrder(customerPk) {
        return this.orderLists.get(customerPk);
    }
}


/* ----- 주문 관리 ----- */     // 고객, 음식을 주문서 객체로 변환 + 부가작업 (~= proxy pattern)
class OrderManagement {
    orderList; // OrderList 객체 저장

    constructor() {
        this.orderList = new OrderList();
    }

    // customer, menu -> Order객체로 변환 후 저장
    createOrder(customer, menu) {
        let order = new Order(customer, menu);
        this.orderList.addOrder(order);
    }

    cancelOrder(customerPk) {
        this.orderList.removeOrder(customerPk);
    }

    checkOrder(customerPk) {
        return this.orderList.getOrder(customerPk);
    }
}

// 주문관리 객체 생성
const orderManagement = new OrderManagement();


// 생성된 주문관리 객체 내보내기
export default orderManagement