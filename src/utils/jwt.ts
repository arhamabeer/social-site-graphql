import jwt from "jsonwebtoken";

const JWT_SECRET = `sajdkn3jk2bn4nSJdfuiojJFUIO$EWJ0FJEWFJ09jduiofj09w&ejfiods*jf09j1-ioje08fjsdiojfJUINEF8JD-0`;

export function jwtDecode(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function jwtSign(payload: any) {
  return jwt.sign(payload, JWT_SECRET);
}
