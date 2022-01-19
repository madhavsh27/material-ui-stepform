export const validateForm = async (stepOneData) => {
  const { email, name, phoneNumber } = stepOneData;
  const isText = RegExp(/^[A-Z ]+$/i);
  const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/); // us

  let responseObj = {};

  responseObj.isEmailValid = email && isEmail.test(email) ? false : true;
  responseObj.isNameValid =
    name && isText.test(name) && name.length > 3 ? false : true;
  responseObj.isPhoneNumValid =
    phoneNumber && isPhone.test(phoneNumber) && phoneNumber.length === 10
      ? false
      : true;

  return responseObj;
};
