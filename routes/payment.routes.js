module.exports = app => {
    const payments_controller = require("../controllers/payments.controller");
    //var router = require("express").Router();

    //router.post("/makepay", payments_controller.MakePayments);

    //get payment by id
   // router.get("/getp/:id", payments_controller.GetPaymentByIDPost);

       //update paymet
   // router.post("/updatep", payments_controller.UpdatePayment);

    //Delete payment
    //router.post("deletep", payments_controller.DeletePayment);



    app.use('api/payments/', router);

}