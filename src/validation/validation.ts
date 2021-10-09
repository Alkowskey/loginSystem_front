const minimumLengthOfUsername = 5;
const minimumLengthOfPassword = 8;

export const isValidUsername = (username: string): boolean => {
  return /^\w{5,}$/.test(username);
};
export const isValidPassword = (pass: string): boolean => {
  return !!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/);
};

const isLongerThan = (str: string, n: number): boolean => {
  return str.length >= n;
};
const containsNumber = (str: string): boolean => {
  return /\d/.test(str);
};
const containsLower = (str: string): boolean => {
  return str.toUpperCase() !== str;
};
const containsUpper = (str: string): boolean => {
  return str.toLowerCase() !== str;
};

export const verifyForm = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): { check: boolean; err: string } => {
  if (!isLongerThan(username, minimumLengthOfUsername)) {
    return {
      check: false,
      err: `Username is shorter than ${minimumLengthOfUsername} letters`,
    };
  }
  if (!isLongerThan(password, minimumLengthOfPassword)) {
    return {
      check: false,
      err: `password is shorter than ${minimumLengthOfPassword} letters`,
    };
  }
  if (!containsNumber(password)) {
    return {
      check: false,
      err: `password does not contain number`,
    };
  }
  if (!containsLower(password)) {
    return {
      check: false,
      err: `password does not contain lowercase letter`,
    };
  }
  if (!containsUpper(password)) {
    return {
      check: false,
      err: `password does not contain uppercase letter`,
    };
  }
  if (!isValidUsername(username)) {
    return { check: false, err: "Username does not meet criteria" };
  }
  if (!isValidPassword(password)) {
    return { check: false, err: "Password does not meet criteria" };
  }
  return { check: true, err: "" };
};
