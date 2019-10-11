export const LOGIN_VALIDATION_SCHEMA = {
  email: {
    notEmpty: true,
    isEmail: {
      errorMessage: 'INVAILD_EMAIL_PROVIDED'
    },
    errorMessage: 'EMAIL_NOT_EMPTY'
  },
  password: {
    notEmpty: true,
    isLength: {
      options: [{
        min: 6,
        max: 35
      }],
      errorMessage: 'INVAILD_PASSWORD_PROVIDED'
    },
    errorMessage: 'PASSWORD_NOT_EMPTY'
  }
}
export const REGISTER_VALIDATION_SCHEMA = {
  email: {
    notEmpty: true,
    isEmail: {
      errorMessage: 'INVAILD_EMAIL_PROVIDED'
    },
    errorMessage: 'EMAIL_NOT_EMPTY'
  },
  username: {
    notEmpty: true,
    isLength: {
      options: [{
        min: 6,
        max: 35
      }],
      errorMessage: 'INVAILD_USERNAME_PROVIDED'
    },
    errorMessage: 'USERNAME_NOT_EMPTY'
  },
  password: {
    notEmpty: true,
    isLength: {
      options: [{
        min: 6,
        max: 35
      }],
      errorMessage: 'INVAILD_PASSWORD_PROVIDED'
    },
    errorMessage: 'PASSWORD_NOT_EMPTY'
  }
}
