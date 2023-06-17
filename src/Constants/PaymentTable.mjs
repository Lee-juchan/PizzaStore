/*
    메뉴 가격표 (~= Enum)

    + PaymentTable <-연관-- Menu    (Menu추가 시 PaymentTable도 함께 추가)
*/

const PaymentTable = {
    pizza : 10000,
    cheesePizza : 12000,
    pepperoniPizza : 12000,
    potatoPizza : 12000,

    spaghetti : 8000,

    cheese : 2000,
    pepperoni : 2000,
    potato : 2000,
    olive : 1000,
    pineapple : 1000
};
Object.freeze(PaymentTable);

export default PaymentTable;