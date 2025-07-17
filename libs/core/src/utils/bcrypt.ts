import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

export function comparePassword(plainPassword: string, hashedPassword: string) {
  const match = bcrypt.compareSync(plainPassword, hashedPassword);
  return match;
}
