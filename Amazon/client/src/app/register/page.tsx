import AmazonLogo from "@/assets/amazon_logo_white.svg";
import Link from "next/link";
import { handleSubmit } from "./action";
import ClientFlashComponent from "@/components/ClientFlashComponent";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img
            src={AmazonLogo.src}
            alt="Amazon Logo"
            className="w-32 mx-auto"
          />
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
            Create account
          </h2>
        </div>
        <ClientFlashComponent />
        <form
          action={async (formData) => {
            "use server"
            await handleSubmit(formData);
          }}
          noValidate
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
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
        <hr />
        <div className="flex justify-center w-full gap-1 items-center">
          <p className="text-sm text-gray-600">Already have an account? </p>
          <Link
            href="/signin"
            className="text-blue-500 text-sm hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
