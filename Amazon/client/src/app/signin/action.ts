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

  const email = formData.get("email")?.toString() || '';
  const password = formData.get("password")?.toString() || '';

  const parsedData = signinInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errMessage}`;

    return redirect(`./signin?error=${errFinalMessage}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !compareTextWithHash(parsedData.data.password, user.password)) {
    return redirect(`./signin?error=Invalid%20email/password`);
  }

  const payload = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };

  const access_token = await createToken(payload);

  cookies().set("access_token", access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return redirect(`/`);
};
