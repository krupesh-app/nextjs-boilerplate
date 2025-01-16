import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      planName,  // Get planName from request
      amount     // Get amount from request
    } = data;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const client = await clientPromise;
      const db = client.db();

      const planFeatures = {
        Basic: {
          users: 5,
          storage: 10,
          supportLevel: 'basic',
          validityDays: 365, // 1 year
        },
        Pro: {
          users: 999999, // Unlimited
          storage: 100,
          supportLevel: 'priority',
          validityDays: 365, // 1 year
        },
      };

      // Find existing subscription
      const subscription = await db.collection("subscriptions").findOne({
        userEmail: session.user.email
      });

      const now = new Date();
      const validUntil = subscription?.validUntil > now 
        ? new Date(subscription.validUntil.getTime() + (planFeatures[planName].validityDays * 24 * 60 * 60 * 1000))
        : new Date(now.getTime() + (planFeatures[planName].validityDays * 24 * 60 * 60 * 1000));

      // Update or create subscription
      await db.collection("subscriptions").updateOne(
        { userEmail: session.user.email },
        {
          $set: {
            name: planName,
            status: 'active',
            validUntil: validUntil,
            features: planFeatures[planName],
            updatedAt: now
          },
          $setOnInsert: {
            createdAt: now
          },
          $push: {
            paymentHistory: {
              razorpayPaymentId: razorpay_payment_id,
              razorpayOrderId: razorpay_order_id,
              amount: amount,
              currency: 'INR',
              status: 'completed',
              createdAt: now
            }
          }
        },
        { upsert: true }
      );

      return NextResponse.json({
        verified: true,
        message: "Payment verified successfully"
      });
    } else {
      return NextResponse.json(
        { verified: false, error: "Invalid signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
} 