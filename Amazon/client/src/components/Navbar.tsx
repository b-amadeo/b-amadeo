import AmazonLogo from "@/assets/amazon_logo.png";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import Searchbar from "./Searchbar";

interface DecodedToken extends JwtPayload {
  name?: string;
}

const Navbar = () => {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  const isLoggedIn = !!access_token;
  let userName = "";

  if (isLoggedIn) {
    try {
      const decodedToken = jwt.decode(access_token.value) as DecodedToken;
      if (decodedToken && decodedToken.name) {
        userName = decodedToken.name.split(" ")[0];
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <nav className="flex justify-between items-center bg-[#232f3e] p-3 text-white">
      <div className="text-2xl font-bold">
        <Link href="/">
          <img
            src={AmazonLogo.src}
            className="ml-2"
            alt="Amazon Logo"
            width={100}
            height={30}
          />
        </Link>
      </div>
      <Searchbar />
      <div className="flex items-center gap-4 whitespace-nowrap">
        {isLoggedIn ? (
          <>
            <span className="hidden sm:inline-block">Hello, {userName}</span>
            <Link href="/wishlist" className="flex items-center">
              {/* <FontAwesomeIcon icon={faCartShopping} className="text-xl mr-1" /> */}
              <span>Wishlist</span>
            </Link>
            <form
              action={async () => {
                "use server";

                cookies().get("access_token") && cookies().delete("access_token");

                return redirect("/");
              }}
              className="flex items-center"
            >
              <button className="flex items-center p-1 bg-[#FFCCCB] text-black rounded">
                {/* <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-xl" /> */}
                <span>Sign Out</span>
              </button>
            </form>
          </>
        ) : (
          <Link href="/signin">
            <button className="p-1 bg-[#febd69] text-black rounded">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
