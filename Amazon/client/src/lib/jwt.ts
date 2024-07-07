import * as jose from "jose";

type Payload = {
  id: string
  name: string
  email: string
}

const SECRET_KEY = process.env.SECRET_KEY as string

export const createToken = async (payload: Payload) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secretKey);
  return token;
};

export const readPayloadJose = async (token: string): Promise<Payload> => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify(token, secretKey);

  return payloadJose.payload as Payload;
};
