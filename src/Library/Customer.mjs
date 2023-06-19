/* ----- 고객 ----- */
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