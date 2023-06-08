export const validateName = (name, setValidationError) => {
  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(name)) {
    alert(
      "Invalid name: login cannot contain numbers, hyphens, spaces, special characters"
    );
    setValidationError("Invalid name");
  } else {
    setValidationError(false);
  }
};

export const validateEmail = (email, setValidationError) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email: it must contain @ and domain part, invalid space");
    setValidationError("Invalid email");
  } else {
    setValidationError(false);
  }
};

export const validatePassword = (password, setValidationError) => {
  if (password.length < 6) {
    alert("Password should be at least 6 characters");
    setValidationError("Password should be at least 6 characters");
  } else {
    setValidationError(false);
  }
};
