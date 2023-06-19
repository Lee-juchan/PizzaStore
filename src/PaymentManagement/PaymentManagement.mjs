import CashHandler from "./PaymentHandler/impl/CashHandler.mjs"
import DebitCardHandler from "./PaymentHandler/impl/DebitCardHandler.mjs"
import PointHandler from "./PaymentHandler/impl/PointHandler.mjs"
import StatisticsHandler from "./PaymentHandler/impl/StatisticsHandler.mjs"

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
const statisticsHandler = new StatisticsHandler();
cashHandler.setNext(debitCardHandler).setNext(pointHandler).setNext(statisticsHandler); // 체이닝

// 결제관리 객체 생성
const paymentManagement = new PaymentManagement();
paymentManagement.setMainHandler(cashHandler);

// 생성된 결제관리 객체 내보내기
export default paymentManagement