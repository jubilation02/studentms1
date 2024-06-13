const {sequelize_config, Sequelize} = require (".");

module.exports = (sequelize_config, Sequelize) => {
    const staff = sequelize_config.define ("staff",{
        first_name :{type:Sequelize.STRING},
        last_name :{type:Sequelize.STRING},
        departmemt :{type:Sequelize.STRING},
        salary :{type:Sequelize.INTEGER},
        phone_number :{type:Sequelize.TEXT},
        date_of_birth :{type:Sequelize.DATE},
        marital_status :{type:Sequelize.ENUM,
            values: ['single', 'engaged', 'married', 'other'],
            allowNull: false,
        }
    });

    return staff;
}