import PaymentMethod from "../../../Library/Constants/PaymentMethod.mjs";
import PaymentHandler from "../PaymentHandler.mjs"

/* ----- 현금 핸들러 ----- */
class CashHandler extends PaymentHandler {

    // @Override
    // 현금 처리
    handle(customer, price) {
        if((customer.paymentMethod === PaymentMethod.CASH)) { // 결제수단이 CASH면

            // 잔액 확인
            if(customer.balance >= price) {
                customer.balance -= price;
            } else {
                console.log("less balance");
            }
        }
        
        // 다음 핸들러로 주문전달
        super.handle(customer, price);
    }
}

export default CashHandler