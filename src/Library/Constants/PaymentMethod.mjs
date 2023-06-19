/* ----- 결제수단 (~= Enum) ----- */
const PaymentMethod = {
    CASH : "cash",
    POINT : "point",
    DEBITCARD : "debit card"
};
Object.freeze(PaymentMethod);

export default PaymentMethod;