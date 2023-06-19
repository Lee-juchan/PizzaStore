import PaymentMethod from "../../../Library/Constants/PaymentMethod.mjs";
import PaymentHandler from "../PaymentHandler.mjs"

/* ----- 포인트 핸들러 ----- */
class PointHandler extends PaymentHandler {

    // @Override
    // 포인트 처리
    handle(customer, price) {
        if((customer.paymentMethod === PaymentMethod.POINT)) { // 결제수단이 POINT면

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

export default PointHandler