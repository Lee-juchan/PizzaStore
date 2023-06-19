import PaymentMethod from "../../../Library/Constants/PaymentMethod.mjs";
import PaymentHandler from "../PaymentHandler.mjs";

/* ----- 현금카드 핸들러 ----- */
class DebitCardHandler extends PaymentHandler {
    
    // @Override
    // 현금카드 처리
    handle(customer, price) {
        if((customer.paymentMethod === PaymentMethod.DEBITCARD)) { // 결제수단이 DEBITCARD면
            
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

export default DebitCardHandler