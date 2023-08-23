export function AppEnv(key: string, defaultValue: any) {
  let val;

  if (process.env[key] === undefined) val = defaultValue;
  else val = process.env[key];

  if (typeof val == 'string') {
    if (val.toLowerCase() == 'true') val = true;
    else if (val.toLowerCase() == 'false') val = false;
  }

  return val;
}
