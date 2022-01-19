export const validateForm = async (stepOneData) => {
  const { password, confirmPwd } = stepOneData;

  let responseObj = {};

  responseObj.isPasswordValid =
    password && password.length >= 8 ? false : true;
  responseObj.isConfirmPwdValid =
    confirmPwd && confirmPwd === password ? false : true;

  return responseObj;
};
