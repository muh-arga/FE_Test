"use client";

import { Eye, EyeOff, LogIn } from "lucide-react";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = {};

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const usernameError = state.fieldErrors?.username;
  const passwordError = state.fieldErrors?.password;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="from" value={redirectTo} />

      {state.error && (
        <div role="alert" className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">
          {state.error}
        </div>
      )}

      <Field label="Username" htmlFor="username" error={usernameError}>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          defaultValue={state.username}
          aria-invalid={Boolean(usernameError)}
          aria-describedby={usernameError ? "username-error" : undefined}
          autoFocus
        />
      </Field>

      <Field label="Password" htmlFor="password" error={passwordError}>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="pr-10"
            aria-invalid={Boolean(passwordError)}
            aria-describedby={passwordError ? "password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-muted hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
          >
            {showPassword ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        </div>
      </Field>

      <Button type="submit" className="w-full" disabled={isPending}>
        <LogIn className="size-4" aria-hidden />
        {isPending ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
