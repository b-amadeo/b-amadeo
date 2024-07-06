import { getProducts, searchProductsByName } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "8", 10);
  const skip = (page - 1) * limit;

  if (query) {
    try {
      const products = await searchProductsByName(query, skip, limit);
      return NextResponse.json(products, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    try {
      const products = await getProducts(skip, limit);
      return NextResponse.json(products, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        {
          statusCode: 500,
          message: "Internal Server Error!",
        },
        {
          status: 500,
        }
      );
    }
  }
};
