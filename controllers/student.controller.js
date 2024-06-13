const { where } = require("sequelize");
const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;
const Finance = db.fainance;

// Retrieves all Students from the db
exports.GetAllStudents = (req, res) => {
    Student.findAll()
        .then(
            data => {
                res.send({
                    status: "Success",
                    status_code: 1001,
                    message: "Students retrieved",
                    result: data
                });
            }
        )
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 1001,
                message: err.message || "Error Occurred While retrieving students"
            });
        });
}

// Update a Spefic Student
exports.UpdateStudent = (req, res) => {
    const param_id = req.params.id;
    Student.update(req.body, {
        where: { id : param_id}
    }).then(
        data => {
            if(data == 1){
                res.send({
                    status: "Success",
                    status_code: 100,
                    message: "Student Updated",
                    result: data
                });
            }else{
                res.send({
                    status: "Error",
                    status_code: 101,
                    message: `Student with id ${param_id} was not found. No recorded updated`,
                    result: data
                });
            }

            
        }
    ).catch(err => {
        res.status(500).send({
            status: "Error",
            status_code: 101,
            message: err.message || "Error Occurred While updating a student"
        });
    });
}

// Find a Specific Student by ID - GET
exports.GetStudentByID = async (req, res) => {
    const param_id = req.params.id;
    const student_id = await Student.findByPk(param_id);

    if(student_id === null){
        res.status(400).send({
            message: "Error retrieving student with id"
        });
        return;
    }

    Student.findByPk(param_id)
        .then( data => {
                res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error in finding a student"
            });
        });

}

// Find a Specific Student by ID - POST
exports.GetStudentByIDPost = async (req, res) => {
    const body_id = req.body.student_id;
    const student_id = await Student.findByPk(body_id);

    if(student_id === null){
        res.status(400).send({
            message: "Error retrieving student with id"
        });
        return;
    }

    Student.findByPk(body_id)
        .then( data => {
                res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error in finding a student"
            });
        });
}

// Create a new Student
exports.CreateStudent = async (req, res) => {
    if(!req.body.first_name){
        res.status(400).send({
            message: "First Name is Required"
        });
        return;
    }
    if(!req.body.last_name){
        res.status(400).send({
            message: "Last Name is Required"
        });
        return;
    }
    if(!req.body.gender){
        res.status(400).send({
            message: "Gender is Required"
        });
        return;
    }
    const student_data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        class: req.body.class,
        physical_address: req.body.physical_address,
        status: req.body.status ? req.body.status : false
    }

    Student.create(student_data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 1001,
                message: err.message || "Error Occurred While creating students"
            });
        });
}

// Delete a Student by ID
exports.DeleteStudent = async (req, res) => {
    const body_id = req.body.student_id;
    const student_id = await Student.findByPk(body_id);

    if(student_id === null){
        res.status(400).send({
            message: "Error deleting a student with id"
        });
        return;
    }

    Student.destroy({
        where: {id: student_id}
    })
    .then(
        data => {
            if(data == 1){
                res.send({
                    status: "Success",
                    status_code: 100,
                    message: "Student Deleted",
                    result: data
                });
            }else{
                res.send({
                    status: "Error",
                    status_code: 101,
                    message: `Student with id ${param_id} was not found. No recorded deleted`,
                    result: data
                });
            }

            
        }
    ).catch(err => {
        res.status(500).send({
            status: "Error",
            status_code: 101,
            message: err.message || "Error Occurred While deleting a student"
        });
    });
    
}

// Search a Specific Student
exports.SearchStudent = async (req, res) => {
    const first_name = req.query.first_name;
    var condition = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null;

    Student.findAll({where: condition})
        .then(data => {
           
            res.send(data);
        })
        .catch(err => {
            
            res.status(500).send({
                message: err.message || "Error while searching a student/"
                
            });

        });
}

// List Range
exports.ListRange = async (req, res) => {
    
    const { minFee, maxFee } = req.query;

    console.log("Min fee "+minFee);
    console.log("Max fee "+maxFee);
    
    Student.findAll({
            include: [
                {
                    model: StudentFinance,
                    where: {
                        school_fees_amount: { [Op.between] : [parseInt(minFee), parseInt(maxFee)] }
                    }
                }
            ]

        })
        .then(data => {
            // res.send(data);
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while retrieving range"
            });

        });
}

exports.CapturePayments = (req, res) => {
   let payments =req.body.school_fees;
    Student.findAll(payments) 
        .then(
            payment =>{
                res.send(payment)
            })
        .catch(err =>{
            res.send({message: "Payment failed"});
        });
        

    
}
        
exports.MakePayments = (req, res) => {
    const feesPayment = {
        finance_id: req.body.finance_id,
        student_id: req.body.student_id,
        school_fees: req.body.school_fees
    }

    Finance.create(feesPayment)
         .then(data => {
             res.send(data);
            })
         .catch(err =>{
              res.send({message: err.message ||"error making payment"});
         });
}

//cap payment
exports.CapturePayments = async(req, res) =>{
   const  {student_id,finance_id, school_fees} =req.body;

   if (!student_id || !finance_id || !school_fees) {
      return res.send({
         message: "Required fields not filled"
      });
   }
   const payment ={student_id, finance_id, school_fees, timestamp: new Date()};
   Finance.create(payment);
    res.status(200).send({
        success: true,
        payment
    });
}
//capture tota

exports.GetTotalFees =(req, res) =>{
    let school_fees = req.body.school_fees;
    const {student_id} =req.params;
    const studentPayments = school_fees.filter(studentfinances =>studetfinances.student_id === student_id);
    
    const totalAmount = studentPayments.deduce((total, Finance) =>total + studentfinances.school_fees, 0);
        res.status(200).send({
            success: true,
            student_id,
            totalAmount,
            school_feesCount: studentPayments.length
        });         
}

//get fees balance
exports.GetBalance = (req, res) => {
    const {student_id} = req.params;
    const student = Student[student_id];
    if (!student){
        return res.status(404).send({
            sucess: false,
            message: "student not found"
        });
    }
    const balance = student.school_fees - student.payments;
    res.status(200).send({
        sucess: true,
        student_id,
        balance
    });
}

//get total balance
exports.GetTotalBalance =(req, res) =>{
    let totalBalance = o;
    for (const student_id in Student){
        const student = student[student_id];
        totalBalance += (student.school_fees - student.payments);
    }
    res.status(200).send({
        sucess: true,
        totalBalance
    });
}