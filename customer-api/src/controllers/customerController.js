const { User, Customer } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey";

exports.addCustomer = async (req, res) => {
  const {
    fullName,
    mobileNumber,
    birthdate,
    gender,
    address,
    landmark,
    pincode,
  } = req.body;
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(decoded.id);

    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const pincodeData = response.data[0];
    if (pincodeData.Status !== "Success") {
      return res.status(400).json({ message: "Invalid pincode" });
    }

    const addressData =
      pincodeData.PostOffice[pincodeData.PostOffice.length - 1];

    const newCustomer = await Customer.create({
      fullName,
      mobileNumber,
      birthdate,
      gender,
      address,
      landmark,
      pincode,
      createdBy: user.id,
    });

    res.status(201).json({ message: "Customer added", customer: newCustomer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.editCustomer = async (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    mobileNumber,
    birthdate,
    gender,
    address,
    landmark,
    pincode,
  } = req.body;
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(decoded.id);

    // Validate pincode
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const pincodeData = response.data[0];
    if (pincodeData.Status !== "Success") {
      return res.status(400).json({ message: "Invalid pincode" });
    }

    const addressData =
      pincodeData.PostOffice[pincodeData.PostOffice.length - 1];

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.fullName = fullName;
    customer.mobileNumber = mobileNumber;
    customer.birthdate = birthdate;
    customer.gender = gender;
    customer.address = address;
    customer.landmark = landmark;
    customer.pincode = pincode;
    customer.updatedBy = user.id;
    await customer.save();

    res.json({ message: "Customer updated", customer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
