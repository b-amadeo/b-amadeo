import AmazonLogo from "@/assets/amazon_logo_white.svg"
import Link from "next/link";
import { signin } from "./action";
import ClientFlashComponent from "@/components/ClientFlashComponent";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img
            src={AmazonLogo.src}
            alt="Amazon Logo"
            className="w-32 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>
        <ClientFlashComponent />
        <form action={signin} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Continue
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/register"
            className="block w-full px-4 py-2 mt-4 text-sm font-medium text-yellow-500 border border-yellow-500 rounded-md hover:bg-yellow-50"
          >
            Create your Amazon account
          </Link>
        </div>
      </div>
    </div>
  );
}
