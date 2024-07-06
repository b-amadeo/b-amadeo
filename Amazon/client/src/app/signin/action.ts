"use server";

import { getUserByEmail } from "@/db/models/user";
import { compareTextWithHash } from "@/db/utils/hash";
import { createToken } from "@/lib/jwt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

export const signin = async (formData: FormData) => {
  const signinInputSchema = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email format" }),
    password: z.string().nonempty({ message: "Password is required" })
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = signinInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errMessage}`;

    return redirect(process.env.NEXT_PUBLIC_BASE_URL + `/signin?error=${errFinalMessage}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !compareTextWithHash(parsedData.data.password, user.password)) {
    return redirect(process.env.NEXT_PUBLIC_BASE_URL + `/signin?error=Invalid%20email/password`);
  }

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const access_token = createToken(payload);

  cookies().set("access_token", access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return redirect(`/`);
};