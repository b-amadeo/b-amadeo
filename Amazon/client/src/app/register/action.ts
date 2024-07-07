"use server"
import { redirect } from "next/navigation";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const handleSubmit = async (formData: FormData) => {
  const response = await fetch("./api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  const responseJson: MyResponse<unknown> = await response.json();

  if (!response.ok) {
    let message = responseJson.error ?? "Something went wrong!";
    return redirect(`/register?error=${message}`);
  }

  return redirect("/signin");
};
