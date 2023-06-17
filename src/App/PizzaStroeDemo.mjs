import menuManageMent from "../MenuManagement.mjs";
import orderManagement from "../OrderManagement.mjs";
import paymentManagement from "../PaymentManagement.mjs";
import Customer from "../Library/Customer.mjs";
import PaymentMethod from "../Constants/PaymentMethod.mjs";


// 불러온 관리객체 옮겨담기
const mm = menuManageMent;
const om = orderManagement;
const pm = paymentManagement;

// 고객 생성
let customer1 = new Customer(10, PaymentMethod.CASH, 20000);
let customer2 = new Customer(20, PaymentMethod.DEBITCARD, 30000);
let customer3 = new Customer(30, PaymentMethod.POINT, 40000);


/* ----- 메뉴 관리 ----- */
// 메뉴판 출력
mm.printMenu();

// 메뉴 선택
let menu1 = mm.chooseMenu("cheesePizza", "olive");
let menu2 = mm.chooseMenu("potatoPizza", "pepperoni", "pineapple");
let menu3 = mm.chooseMenu("spaghetti");


/* ----- 주문 관리 ----- */
// 주문 등록
om.createOrder(customer1, menu1);
om.createOrder(customer2, menu2);
om.createOrder(customer3, menu3);

// 주문 확인
let order1 = om.checkOrder(customer1.pk);
let order2 = om.checkOrder(customer2.pk);
let order3 = om.checkOrder(customer3.pk);


/* ----- 결제 관리 ----- */
// 결제
pm.pay(order1);
pm.pay(order2);
pm.pay(order3);

// 결과 확인 -> 돈 차감 + 매출액 증가
console.log(customer1.balance, customer2.balance, customer3.balance);
console.log(pm.mainHandler.nextHandler.nextHandler.nextHandler);