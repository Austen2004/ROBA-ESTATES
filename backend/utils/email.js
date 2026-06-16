// Sends transactional emails using Resend (https://resend.com).
// Free tier: 100 emails/day, 3000/month -- no credit card needed.
//
// Setup:
// 1. Sign up at resend.com, verify your account.
// 2. Get an API key from the dashboard.
// 3. Add RESEND_API_KEY to your .env (and to Render's environment variables).
// 4. By default Resend's sandbox lets you send FROM onboarding@resend.dev
//    TO your own verified email only. To send to any address, verify a
//    domain you own under Resend > Domains, then update FROM_EMAIL below.

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "Roba Estates <onboarding@resend.dev>";

export async function sendPasswordResetEmail(toEmail, name, resetLink) {
  if (!RESEND_API_KEY) {
    // No email service configured -- log the link so it's usable in development.
    console.warn("RESEND_API_KEY not set. Password reset link (dev only):", resetLink);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: toEmail,
      subject: "Reset your Roba Estates password",
      html: `
        <p>Hi ${name || "there"},</p>
        <p>We received a request to reset your Roba Estates password. Click the link below to choose a new one. This link expires in 1 hour.</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `
    })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    console.error("Failed to send reset email:", data);
    throw new Error("Failed to send reset email");
  }
}
