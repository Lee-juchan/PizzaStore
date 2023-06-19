/* ----- 주문 리스트 ----- */ 
class OrderList {
    orderLists; // Map <customerPk, Order Obj> : 주문서 저장하는 맵
    static instance = null;
    
    constructor() { // 항상 동일한 객체 리턴 (singleton)
        if(!OrderList.instance) {
            this.orderLists = new Map();
            OrderList.instance = this;
        }
        return OrderList.instance;
    }

    // 주문 추가
    addOrder(order) {
        this.orderLists.set(order.customer.pk, order);
    }

    // 주문 삭제
    removeOrder(customerPk) {
        this.orderLists.delete(customerPk);
    }

    // 주문 검색
    getOrder(customerPk) {
        return this.orderLists.get(customerPk);
    }
}

export default OrderList