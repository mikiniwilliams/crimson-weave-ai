import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase } from "./client";

export type AuthState =
  | { status: "loading" }
  | { status: "unconfigured" }
  | { status: "signed-out" }
  | { status: "signed-in"; user: User; session: Session };

// Subscribes to Supabase auth state. Returns "unconfigured" when env vars are missing
// so the UI can show a helpful message instead of an unbounded loading spinner.
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setState({ status: "unconfigured" });
      return;
    }

    let cancelled = false;

    sb.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        setState({ status: "signed-in", user: data.session.user, session: data.session });
      } else {
        setState({ status: "signed-out" });
      }
    });

    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setState({ status: "signed-in", user: session.user, session });
      } else {
        setState({ status: "signed-out" });
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

export async function signInWithPassword(email: string, password: string) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured.");
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signOut();
}
