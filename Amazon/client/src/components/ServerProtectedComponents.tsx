import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ServerProtectedComponents = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookiesStore = cookies();

  const access_token = cookiesStore.get("access_token");

  if (!access_token || access_token.value.length <= 0) {
    redirect("/signin");
  }

  return <>{children}</>;
};

export default ServerProtectedComponents;