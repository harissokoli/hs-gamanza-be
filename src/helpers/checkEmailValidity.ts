const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const checkEmailValidity = (email: string) => {
  return emailRegex.test(email);
};
