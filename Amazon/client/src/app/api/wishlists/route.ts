import { getWishlists, createWishlist, getWishlistsByUserId, deleteWishlistItem } from "@/db/models/wishlist";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ObjectId } from "mongodb";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const wishlistInputSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "productId must be a valid ObjectId"),
});

const wishlistItemSchema = z.object({
  wishlistItemId: z.string().regex(/^[0-9a-fA-F]{24}$/, "wishlistItemId must be a valid ObjectId"),
});

export const GET = async (request: Request) => {
  const userId = request.headers.get("user_id");

  if (!userId) {
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 400,
        error: "User ID is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const wishlists = await getWishlistsByUserId(userId);
    
    return NextResponse.json<MyResponse<any>>(
      {
        statusCode: 200,
        message: "Read Wishlists Successful",
        data: wishlists,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        error: "Internal Server Error!",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const userId = request.headers.get("user_id");

    if (!userId) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: "User ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const data = await request.json();

    const parsedData = wishlistInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const { productId } = parsedData.data;

    const wishlistItems = await getWishlists();

    const wishlistItemExists = wishlistItems.some(
      (item: any) => item.userId.equals(userId) && item.productId.equals(productId)
    );

    if (wishlistItemExists) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: 'Item has already been wishlisted',
        },
        {
          status: 400,
        },
      );
    }

    const wishlistItem = await createWishlist({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Wishlist item added successfully",
        data: wishlistItem,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error!",
      },
      {
        status: 500,
      },
    );
  }
};

export const DELETE = async (request: Request) => {
  const userId = request.headers.get("user_id");

  if (!userId) {
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 400,
        error: "User ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const data = await request.json();

  const parsedData = wishlistItemSchema.safeParse(data);

  if (!parsedData.success) {
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 400,
        error: parsedData.error?.message || "Invalid input",
      },
      {
        status: 400,
      }
    );
  }

  const { wishlistItemId } = parsedData.data;

  try {
    const wishlistItems = await getWishlistsByUserId(userId);

    const wishlistItemExists = wishlistItems.find((item: any) =>
      item._id.equals(new ObjectId(wishlistItemId))
    );

    if (!wishlistItemExists) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 404,
          error: "Wishlist item not found",
        },
        {
          status: 404,
        }
      );
    }

    await deleteWishlistItem(new ObjectId(wishlistItemId));

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        message: "Wishlist item deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};