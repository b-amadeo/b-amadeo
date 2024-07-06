import AmazonLogo from "@/assets/amazon_logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-32">
        <div className="flex justify-between">
          <div>
            <h4 className="font-bold mb-2">Get to Know Us</h4>
            <ul>
              <li className="mb-1 hover:underline text-sm">Careers</li>
              <li className="mb-1 hover:underline text-sm">Blog</li>
              <li className="mb-1 hover:underline text-sm">About Amazon</li>
              <li className="mb-1 hover:underline text-sm">
                Investor Relations
              </li>
              <li className="mb-1 hover:underline text-sm">Amazon Devices</li>
              <li className="mb-1 hover:underline text-sm">Amazon Science</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Make Money with Us</h4>
            <ul>
              <li className="mb-1 hover:underline text-sm">
                Sell products on Amazon
              </li>
              <li className="mb-1 hover:underline text-sm">
                Sell on Amazon Business
              </li>
              <li className="mb-1 hover:underline text-sm">
                Sell apps on Amazon
              </li>
              <li className="mb-1 hover:underline text-sm">
                Become an Affiliate
              </li>
              <li className="mb-1 hover:underline text-sm">
                Advertise Your Products
              </li>
              <li className="mb-1 hover:underline text-sm">
                Self-Publish with Us
              </li>
              <li className="mb-1 hover:underline text-sm">
                Host an Amazon Hub
              </li>
              <li className="mb-1 hover:underline text-sm">
                See More Make Money with Us
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Amazon Payment Products</h4>
            <ul>
              <li className="mb-1 hover:underline text-sm">
                Amazon Business Card
              </li>
              <li className="mb-1 hover:underline text-sm">Shop with Points</li>
              <li className="mb-1 hover:underline text-sm">
                Reload Your Balance
              </li>
              <li className="mb-1 hover:underline text-sm">
                Amazon Currency Converter
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Let Us Help You</h4>
            <ul>
              <li className="mb-1 hover:underline text-sm">
                Amazon and COVID-19
              </li>
              <li className="mb-1 hover:underline text-sm">Your Account</li>
              <li className="mb-1 hover:underline text-sm">Your Orders</li>
              <li className="mb-1 hover:underline text-sm">
                Shipping Rates & Policies
              </li>
              <li className="mb-1 hover:underline text-sm">
                Returns & Replacements
              </li>
              <li className="mb-1 hover:underline text-sm">
                Manage Your Content and Devices
              </li>
              <li className="mb-1 hover:underline text-sm">Help</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-center items-center">
          <img src={AmazonLogo.src} alt="Amazon Logo" className="w-24 pt-2" />
        </div>
      </div>
    </footer>
  );
}
