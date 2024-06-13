const db = require("../models");
const Payment = db.payments;
const Op = db.Sequelize.Op;

exports.MakePayments = (req, res) => {
    const feesPayment = {
        finance_id: req.body.finance_id,
        student_id: req.body.finance_id,
        school_fees: req.bodyschool_fees
    }
    Finance.create(feesPayment)
         .then(data => {
            res.send(data);
         })
         .catch(err =>{
            res.send({message: err.message ||"error making payment"});
         });
}


//return fees balance
exports.GetBalance = (req,res) =>{
    const Total_fees = req.body.school_fees;
    const Payment = req.body.payment;
    const Fees_balance = Total_fees - Payment;

    data => {
        res.status(200).send(data);
    }
    
}