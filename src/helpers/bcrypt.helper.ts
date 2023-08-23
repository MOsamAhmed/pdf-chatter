import * as bcrypt from 'bcrypt';

export async function HashKey(key: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(key, salt);
  return hash;
}

export async function CompareHash(key: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(key, hash);
}
