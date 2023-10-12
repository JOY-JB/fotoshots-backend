import bcrypt from 'bcrypt';
import config from '../config';

const hashedPassword = async (password: string): Promise<string> => {
  const hashedPass = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );

  return hashedPass;
};

export const utils = {
  hashedPassword,
};
