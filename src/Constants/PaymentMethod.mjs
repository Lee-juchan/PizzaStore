/* 
    결제수단 (~= Enum)

    + PaymentMethod <-연관-- PaymentManagement의 PaymentHandler     (PaymentMethod 추가시 PaymentHandlereh 함께 추가)
*/ 

const PaymentMethod = {
    CASH : "cash",
    POINT : "point",
    DEBITCARD : "debit card"
};
Object.freeze(PaymentMethod);

export default PaymentMethod;