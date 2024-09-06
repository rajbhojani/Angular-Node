'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('customers', [
      {
        fullName: 'John Doe',
        mobileNumber: '1234567890',
        birthdate: '1985-02-15',
        gender: 1,
        address: '123 Elm Street',
        landmark: 'Near Central Park',
        pincode: '400001',
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Jane Smith',
        mobileNumber: '0987654321',
        birthdate: '1990-08-25',
        gender: 2,
        address: '456 Oak Avenue',
        landmark: 'Opposite City Mall',
        pincode: '400002',
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Alice Johnson',
        mobileNumber: '1122334455',
        birthdate: '1988-05-30',
        gender: 2,
        address: '789 Pine Road',
        landmark: 'Near Airport',
        pincode: '400003',
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
