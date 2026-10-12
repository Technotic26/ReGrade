import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * OAuth callback handler.
 *
 * Supabase redirects here after a successful Google OAuth flow.
 * This route exchanges the `code` from the URL for a real session,
 * sets the session cookies, persists the validated role if passed,
 * and then redirects to the intended destination.
 *
 * Security: Only 'buyer' and 'seller' roles can be applied through this route.
 * Admin is strictly rejected.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";
  const rawRole = requestUrl.searchParams.get("role");

  // Strictly sanitize role parameter
  const safeRole =
    rawRole === "seller" ? "seller" : rawRole === "buyer" ? "buyer" : null;

  if (!code) {
    return NextResponse.redirect(
      new URL("/auth/login?error=oauth_missing_code", request.url)
    );
  }

  // Determine final redirect destination
  const destination = next;
  const supabaseResponse = NextResponse.redirect(
    new URL(destination, request.url)
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] code exchange failed:", error.message);
    return NextResponse.redirect(
      new URL("/auth/login?error=oauth_exchange_failed", request.url)
    );
  }

  // If a valid role was selected prior to OAuth, ensure it is set on the profile (unless user is admin)
  if (safeRole) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Sync auth user metadata
      await supabase.auth.updateUser({
        data: { role: safeRole },
      });

      const { data: existingProfile } = (await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle()) as { data: { role: string } | null };

      if (existingProfile?.role !== "admin") {
        await supabase
          .from("profiles")
          .upsert({
            id: user.id,
            role: safeRole,
            full_name:
              user.user_metadata?.full_name ??
              user.user_metadata?.name ??
              null,
            avatar_url:
              user.user_metadata?.avatar_url ??
              user.user_metadata?.picture ??
              null,
          } as never);
      }
    }
  }

  return supabaseResponse;
}
