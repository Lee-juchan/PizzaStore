/*
    - 상속관계

                                  PaymentHandler    ------------------------------ abstract
        ________________________________|_________________________________
       |               |                |                |               |
  CashHandler   DebitCardHandler   PointHandler   StatisticsHandler     ...   ---- implements

*/

/* ----- 결제 핸들러 (abstract) ----- */ // (chain of responsibility pattern)
class PaymentHandler {
    nextHandler;

    // 다음 핸들러 저장
    setNext(nextHandler) {
        this.nextHandler = nextHandler;
        return nextHandler; // for 체이닝
    }

    // 처리 : 다음 핸들러로 Order 전달
    handle(customer, price) {
        if(this.nextHandler) {
            this.nextHandler.handle(customer, price);
        }
    }
}

export default PaymentHandler