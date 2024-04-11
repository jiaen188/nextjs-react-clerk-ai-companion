import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
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
      where: { id: params.companionId, userId: user.id },
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

export async function DELETE(request: Request, { params }: { params: { companionId: string } }) {
  try {
    const {userId} = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await prismadb.companion.delete({
      where: { userId, id: params.companionId },
    })

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_DELETE]", error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
