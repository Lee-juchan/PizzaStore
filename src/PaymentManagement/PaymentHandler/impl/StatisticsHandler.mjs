import PaymentHandler from "../PaymentHandler.mjs"

/* ----- 결제통계 핸들러 ----- */
class StatisticsHandler extends PaymentHandler {
    totalSales = 0;
    totalcustomer = 0;

    static instance = null;

    constructor() {  // 항상 동일한 객체 리턴 (singleton)
        if(!StatisticsHandler.instance) {
            super();
            StatisticsHandler.instance = this;
        }
        return StatisticsHandler.instance;
    }
    
    // @Override
    // 결제통계 처리 (매출, 고객 수 누적)
    handle(customer, price) {
        this.totalSales += price;
        this.totalcustomer++;

        // 다음 핸들러로 Order 전달
        super.handle(customer, price);
    }
}

export default StatisticsHandler