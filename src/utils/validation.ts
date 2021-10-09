export const isValidUsername = (username: string): boolean => {
  return /^\w{5,}$/.test(username);
};
export const isValidPassword = (pass: string): boolean => {
  return !!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/);
};

export const verifyForm = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): { check: boolean; err: string } => {
  if (!isValidUsername(username)) {
    return { check: false, err: "Username does not meet criteria" };
  }
  if (!isValidPassword(password)) {
    return { check: false, err: "Password does not meet criteria" };
  }
  return { check: true, err: "" };
};
