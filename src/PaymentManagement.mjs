import PaymentMethod from "./Constants/PaymentMethod.mjs";
import MenuManageMent from "./MenuManagement.mjs";
import Customer from "./Library/Customer.mjs";

/*
    - 결제 관리

    : 결제
*/

/* ----- 결제 핸들러 ----- */
class PaymentHandler { // 부모 클래스
    nextHandler;

    setNext(nextHandler) {
        this.nextHandler = nextHandler;
        return nextHandler; // -> 체이닝 가능
    }

    // 다음 핸들러로 order을 넘김
    handle(customer, price) {
        if(this.nextHandler) {
            this.nextHandler.handle(customer, price);
        }
    }
}

// 현금처리 핸들러
class CashHandler extends PaymentHandler {

    // (overriding) 결제방법이 CASH면 처리
    handle(customer, price) {
        if((customer.paymentMethod === PaymentMethod.CASH)) {
            if(customer.balance >= price) {
                customer.balance -= price;
            } else {
                console.log("less balance");
            }
        }
        
        // 다음 핸들러로 전달
        super.handle(customer, price);
    }
}

// 현금카드처리 핸들러
class DebitCardHandler extends PaymentHandler {
    
    // (overriding) 결제방법이 DEBITCARD면 처리
    handle(customer, price) {
        if((customer.paymentMethod === PaymentMethod.DEBITCARD)) {
            if(customer.balance >= price) {
                customer.balance -= price;
            } else {
                console.log("less balance");
            }
        }
        
        // 다음 핸들러로 전달
        super.handle(customer, price);
    }
}

// 포인트처리 핸들러
class PointHandler extends PaymentHandler {

    // (overriding) 결제방법이 POINT면 처리
    handle(customer, price) {
        if((customer.paymentMethod === PaymentMethod.POINT)) {
            if(customer.balance >= price) { // 잔액이 더 크면
                customer.balance -= price;
            } else {
                console.log("less balance");
            }
        }
        
        // 다음 핸들러로 전달
        super.handle(customer, price);
    }
}


// 부가정보(매출액, 고객수) 처리 핸들러
class PaymentHistory extends PaymentHandler {
    totalSales = 0;     // 총 매출
    customerCount = 0;  // 총 고객

    // 항상 동일한 객체 리턴 (singleton)
    static instance;

    constructor() {
        if(!PaymentHistory.instance) {
            super();
            PaymentHistory.instance = this;
        }
        return PaymentHistory.instance;
    }
    
    // (overriding) 매출, 고객 수 측정
    handle(customer, price) {
        this.totalSales += price;
        this.customerCount++;

        // 다음 핸들러로 전달
        super.handle(customer, price);
    }
}


/* ----- 결제 관리 ----- */
class PaymentManagement {
    mainHandler; // 메인 핸들러 (처음 실행시킬 것)

    // 메인 핸들러 등록
    setMainHandler(mainHandler) {
        this.mainHandler = mainHandler;
    }

    // 가격 계산 (menu -> totalPrice 변환)
    getPrice(menu) {
        let totalPrice = 0;

        // menu의 price계산
        totalPrice += menu.price;
        
        // 피자면 topping의 price도 계산
        if(menu.name.match(/pizza/ig)) {
            menu.toppings.forEach(topping => totalPrice += topping.price);
        } 
        return totalPrice;
    }

    // 결제
    pay(order) {
        let price = this.getPrice(order.menu);

        // mainhandler 호출
        this.mainHandler.handle(order.customer, price);
    }
}

// 핸들러 생성
const cashHandler = new CashHandler();
const debitCardHandler = new DebitCardHandler();
const pointHandler = new PointHandler();
const paymentHistory = new PaymentHistory();
cashHandler.setNext(debitCardHandler).setNext(pointHandler).setNext(paymentHistory); // 체이닝

// 결제관리 객체 생성
const paymentManagement = new PaymentManagement();
paymentManagement.setMainHandler(cashHandler);


// 생성된 결제관리 객체 내보내기
export default paymentManagement