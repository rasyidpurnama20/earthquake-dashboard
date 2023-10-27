"use client";

import { LoginForm } from "@/components/forms";

export default function Login() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="pattern-dots pattern-black pattern-bg-white pattern-size-8 pattern-opacity-5 absolute bottom-0 left-0 right-0 top-0 -z-10 min-h-screen backdrop-blur-sm" />

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <LoginForm />

        <span className="rounded-md border bg-white px-2 py-1 text-xs text-gray-300 shadow-sm">
          versi 1.1
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <span className="text-sm text-gray-500">
          © 2023 dipo-ai X{" "}
          <a
            className="text-blue-500"
            href="https://www.lapi-itb.com/"
            target="_blank"
          >
            PT. Lapi ITB
          </a>
        </span>
      </div>
    </div>
  );
}
