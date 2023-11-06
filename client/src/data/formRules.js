export const phoneNoRules = {
    required: "phone no is required",
    pattern: {
      value: /^\d{10}$/i,
      message: "phone no should be valid",
    },
  };
  
  export const nameRules = {
    required: "Name is required",
    maxLength: {
      value: 20,
      message: "Name should be a maximum of 20 characters",
    },
    minLength: {
      value: 3,
      message: "Name should contain at least 3 characters",
    },
    pattern: {
      value:/^[A-Za-z\s]+$/,
      message: "Name should contain only alphabetic characters",
    },
  };
  
  export const emailRules = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Email must be valid",
    },
  };
  
  export const petNameRules = {
    required: "petname is required",
    maxLength: {
      value: 10,
      message: "petname should be a maximum of 10 characters",
    },
    minLength: {
      value: 2,
      message: "petname should contain at least 2 characters",
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "petname should contain only alphabetic characters",
    },
  };
  
  export const commonQuestionRules = {
    required: "fill all the fields",
    maxLength: {
      value: 50,
      message: "maximum limit is 50 words",
    },
    minLength: {
      value: 4,
      message: "minimum 4 characters required",
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "sentence should contain only alphabetic characters",
    },
  };

  export const additionalQuestionRules = {
    maxLength: {
      value: 50,
      message: "maximum limit is 50 words",
    },
    minLength: {
      value: 4,
      message: "minimum 4 characters required",
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "sentence should contain only alphabetic characters",
    },
  };
  
  