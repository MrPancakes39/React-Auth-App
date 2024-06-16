import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { SupabaseClient as supabase } from "./supabase-client";

import type { AuthError, Session } from "@supabase/supabase-js";

export type AuthContextType = {
  session: Session | null;
  user: Session["user"] | null;
  isAuthenticated: boolean;
  signUp: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<AuthError | null>;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<AuthError | null>;
  signOut: () => Promise<AuthError | null>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  signUp: async () => null,
  signIn: async () => null,
  signOut: async () => null,
});

type AuthProviderProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export function AuthProvider({ fallback, children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Session["user"] | null>(null);

  const authQuery = useQuery({
    queryKey: ["auth", "session", "user"],
    queryFn: async () => {
      const sessionResult = await supabase.auth.getSession();
      if (sessionResult.error) {
        throw sessionResult.error;
      }

      const { session } = sessionResult.data;
      if (session === null) {
        return null;
      }

      const userResult = await supabase.auth.getUser();
      if (userResult.error) {
        throw userResult.error;
      }
      const { user } = userResult.data;

      return { session, user };
    },
  });

  useEffect(() => {
    if (authQuery.data) {
      setSession(authQuery.data.session);
      setUser(authQuery.data.user);
    } else {
      setSession(null);
      setUser(null);
    }
  }, [authQuery.data]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setSession(session);
          setUser(session.user);
        } else {
          setSession(null);
          setUser(null);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (authQuery.isLoading) {
    if (fallback) {
      return fallback;
    }
    return null;
  }

  if (authQuery.isError) {
    return <div>AuthError: {authQuery.error.message}</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isAuthenticated: !!user,
        signIn: async ({ email, password }) => {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            return error;
          }
          return null;
        },
        signUp: async ({ email, password }) => {
          const { error } = await supabase.auth.signUp({ email, password });
          if (error) {
            return error;
          }
          return null;
        },
        signOut: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            return error;
          }
          return null;
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
