const validator = require("email-validator");
const mongoose = require("mongoose");


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

  const isValidBody = function (data) {
    return Object.keys(data).length > 0;
  };

  const isValidMobileNum = function (value) {
    if (!/^[6-9]\d{9}$/.test(value)) {
      return false;
    }
    return true;
  };

  const isValidSyntaxOfEmail = function (value) {
    if (!validator.validate(value.trim())) {
      return false;
    }
    return true;
  };

  const isValidObjectId = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
  }


  module.exports= {
    isValid,
    isValidBody,
    isValidMobileNum,
    isValidSyntaxOfEmail,
    isValidObjectId
};