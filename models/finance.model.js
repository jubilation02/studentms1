
module.exports = (sequelize_config, Sequelize) =>{
    const Student = require("./student.model");
    const StudentFinance= sequelize_config.define ("studentfinance", {
        finance_id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        student_id: {type: Sequelize.INTEGER, 
                            allowNull: false,
                            reference: {
                                model: Student,
                                key: 'student_id'
                            }
                    },
        school_fees: {type: Sequelize.INTEGER, allowNull: false}
    });
   // Student.hasOne(db.finance, {foreignKey:`student_id`});
    return StudentFinance;
    
}