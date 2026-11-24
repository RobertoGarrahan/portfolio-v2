import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

interface SanityWebhookPayload {
  _type?: string;
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET environment variable" },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(
      req,
      secret,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid webhook signature", isValidSignature },
        { status: 401 },
      );
    }

    revalidateTag("portfolio", { expire: 0 });
    if (body?._type) {
      revalidateTag(body._type, { expire: 0 });
    }
    revalidatePath("/");

    return NextResponse.json({
      revalidated: true,
      type: body?._type ?? "portfolio",
      now: Date.now(),
    });
  } catch (error) {
    console.error("Sanity revalidation webhook error:", error);
    return NextResponse.json(
      { message: "Error revalidating content" },
      { status: 500 },
    );
  }
}
