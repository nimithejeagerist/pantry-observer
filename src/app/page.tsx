"use client";

import { auth } from "./firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Oval } from 'react-loader-spinner';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
    }
    setIsLoading(false);
  }, [user, loading, router]); 

  if (isLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
}

export default Home;