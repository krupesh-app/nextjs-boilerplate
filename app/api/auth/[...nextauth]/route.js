import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    EmailProvider({
      server: {
        send: async (message) => {
          try {
            const { to, subject, html } = message;
            await resend.emails.send({
              from: 'Your App <onboarding@resend.dev>',
              to,
              subject,
              html,
            });
          } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
          }
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 