"use client";

import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
