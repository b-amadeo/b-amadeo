import { getUsers, createUser } from "@/db/models/user";
import { NextResponse } from "next/server";
import { z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const userInputSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  username: z.string().nonempty({ message: "Username is required" }),
  email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email format" }),
  password: z.string().nonempty({ message: "Password is required" }).min(5, { message: "Password must be at least 5 characters" }),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const parsedData = userInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const { username, email } = parsedData.data;

    const users = await getUsers();

    const usernameExists = users.some((user) => user.username === username);
    const emailExists = users.some((user) => user.email === email);

    if (usernameExists || emailExists) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: usernameExists
            ? "Username already exists"
            : "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const user = await createUser(parsedData.data);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "User created successfully",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      // const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error !",
      },
      {
        status: 500,
      }
    );
  }
};
