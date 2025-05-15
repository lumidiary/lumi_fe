// email
export const validateEmail = (email: string): boolean => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

//password
export const validatePassword = (password: string): boolean => {
  // 8자 이상, 영문 + 숫자 + 특수문자 모두 포함
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

export const confirmPasswordMatch = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};

//nickname
export const validateNickname = (nickname: string): boolean => {
  return nickname.trim().length >= 1;
};

//birth
export const validateYear = (year: number): boolean => {
  return year >= 1900 && year <= new Date().getFullYear();
};

export const validateMonth = (month: number): boolean => {
  return month >= 1 && month <= 12;
};

export const validateDay = (
  year: number,
  month: number,
  day: number,
): boolean => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
};
