"use client";

import { usePathname, useRouter } from "next/navigation";
import { URLS } from "../lib/constants";
import dynamic from "next/dynamic";
import * as React from "react";
import { getLocalStorageKeyValue } from "../lib/localStorageService";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function WrapperComponent({ children }) {
  const user = getLocalStorageKeyValue("user");
  const pathname = usePathname();
  const router = useRouter();

  if (!user) {
    if (pathname.includes(URLS.home)) {
      router.push(URLS.login);
    }
    if (pathname.includes(URLS.login)) {
      router.push(URLS.login);
    }
    if (pathname.includes(URLS.register)) {
      router.push(URLS.register);
    }
  }

  if (user) {
    if (pathname.includes(URLS.register) || pathname.includes(URLS.login)) {
      router.push(URLS.home);
      return null;
    }
  } else if (pathname.includes(URLS.login)) {
    const Login = dynamic(() => import("@/app/Signin/page"), { ssr: false });
    return <Login />;
  } else {
    const SignUp = dynamic(() => import("@/app/Signup/page"), { ssr: false });
    return <SignUp />;
  }

  return <Provider store={store}>{children}</Provider>;
}
