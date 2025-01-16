import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    // Fetch user's plan from the database
    const userPlan = await db.collection("subscriptions").findOne({
      userEmail: session.user.email
    })

    if (!userPlan) {
      return NextResponse.json({ plan: null })
    }

    return NextResponse.json({ plan: userPlan })

  } catch (error) {
    console.error('Error fetching user plan:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 