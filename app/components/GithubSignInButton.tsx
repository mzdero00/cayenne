"use client";
import { signIn } from "next-auth/react";

export default function GithubSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/" })}
      className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-50"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 .5A11.5 11.5 0 0 0 .5 12.27c0 5.2 3.38 9.61 8.08 11.17.59.1.8-.26.8-.57l-.02-2.01c-3.29.73-3.99-1.42-3.99-1.42-.54-1.4-1.33-1.77-1.33-1.77-1.09-.77.08-.76.08-.76 1.2.09 1.84 1.27 1.84 1.27 1.07 1.89 2.81 1.34 3.49 1.03.11-.8.42-1.34.77-1.65-2.63-.31-5.4-1.35-5.4-6.02 0-1.33.47-2.41 1.25-3.26-.13-.31-.54-1.58.12-3.29 0 0 1.01-.33 3.3 1.24a11.2 11.2 0 0 1 3-.42c1.02 0 2.04.14 3 .42 2.28-1.57 3.29-1.24 3.29-1.24.67 1.71.26 2.98.13 3.29.78.85 1.24 1.93 1.24 3.26 0 4.69-2.78 5.7-5.42 6 .43.38.82 1.12.82 2.26l-.01 3.35c0 .31.2.68.81.57 4.7-1.56 8.07-5.97 8.07-11.17A11.5 11.5 0 0 0 12 .5z"
        />
      </svg>
      Sign in with GitHub
    </button>
  );
}
