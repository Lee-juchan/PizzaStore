/*
    고객 클래스

    Custommer <--연관-- OrderManagement, PaymentManagement    (Custommer 수정시 수정 필요)
*/

class Customer {
    pk;
    paymentMethod;
    balance;

    constructor(pk, paymentMethod, balance) {
        this.pk = pk;
        this.paymentMethod = paymentMethod;
        this.balance = balance;
    }
}

export default Customer;