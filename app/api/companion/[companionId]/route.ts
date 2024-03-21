import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { companionId: string } }) {
  try {
    const user = await currentUser()

    if (params.companionId) {
      return new NextResponse("companionId is required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      instructions,
      seed,
      src,
      categoryId,
    } = body

    if (!name || !description || !instructions || !seed || !src || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // TODO check for subscription

    const companion = await prismadb.companion.update({
      where: { id: params.companionId },
      data: {
        userId: user.id,
        userName: user.firstName,
        name,
        description,
        instructions,
        seed,
        src,
        categoryId,
      }
    })
    
    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_PATCH]", error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}