import bcrypt from 'bcrypt';
import config from '../config';

const hashedPassword = async (password: string): Promise<string> => {
  const hashedPass = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );

  return hashedPass;
};

const isPasswordMatched = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const utils = {
  hashedPassword,
  isPasswordMatched,
};
