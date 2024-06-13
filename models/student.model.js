const { sequelize_config, Sequelize } = require(".");

module.exports =(sequelize_config, Sequelize) => {
    const student =sequelize_config.define("student", {
        student_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        first_name:{type:Sequelize.STRING, allowNull: false},
        last_name:{type:Sequelize.STRING, allowNull: false},
        gender:{type:Sequelize.ENUM('M', 'F'), allowNull: false},
        class:{type:Sequelize.STRING},
        physical_address:{type:Sequelize.STRING},
        status:{type:Sequelize.BOOLEAN},
        //school_fees:{type:Sequelize.INTEGER, allowNull: false},
        fees_balance:{type: Sequelize.INTEGER},
        
    });

    return student;
}