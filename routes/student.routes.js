module.exports = app => {

    // importing the controller logic for the student model
    const student_controller = require("../controllers/student.controller");
    const payments_controller = require("../controllers/payments.controller");
    

    // importing Router interface from Express module
    var router = require("express").Router();

    // route to get all student in our database
    router.put("/update/:id", student_controller.UpdateStudent);
    // http://localhost:8080/api/students/update/1

    // route to get all student in our database
    router.get("/r", student_controller.GetAllStudents);

    // route to find a specific student by ID - GET
    router.get("/find/:id", student_controller.GetStudentByID);

    router.post("/findStudent", student_controller.GetStudentByIDPost);

    router.post("/create", student_controller.CreateStudent);

    // deletes a student by id
    router.post("/delete", student_controller.DeleteStudent);

    //SEARCH student by string
    router.get("/search", student_controller.SearchStudent);

    //geting fees range
    router.get("/fees_range", student_controller.ListRange);

    //cature payments
    router.post("/capturep", student_controller.CapturePayments);

    //make payment
    router.post("/makepay", student_controller.MakePayments);

    //total pay
    router.get("/totalp", student_controller.GetTotalFees);

    //get fees Balance for student
    router.get("/feesbal", student_controller.GetBalance);

    //update paymet
   // router.post("/updatep", payments_controller.UpdatePayment);

    //Delete payment
    //router.post("deletep", payments_controller.DeletePayment);

    // Defining API Root URL
    app.use('/api/students', router);

}