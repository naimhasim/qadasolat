
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import Guest from "./(guest)/guest/page";
// import Dashboard from "./(dashboard)/dashboard/page";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  
  return (
    <>
      {/* session ? <Dashboard/> : <Guest/> */}
      <Guest/>
    </>
  );
}
