import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { readPayloadJose } from "./lib/jwt";

export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    console.log(request.method, request.url);
  }
  
  if (request.url.includes("/api/users")) {
    return NextResponse.next();
  }

  if (request.url.includes("/api")) {
    const cookiesStore = cookies();
    const access_token = cookiesStore.get("access_token");
    
    if (!access_token) {
        return NextResponse.json({
            statusCode: 401,
            error: "Unauthorized",
        });
    }
    
    const tokenData = await readPayloadJose<{ id: string; email: string }>(
        access_token.value
    );
    
    const requestHeaders = new Headers(request.headers);
    
    requestHeaders.set("user_id", tokenData.id);
    requestHeaders.set("user_email", tokenData.email);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
