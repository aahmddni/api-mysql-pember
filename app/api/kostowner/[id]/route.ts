import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

// Fungsi helper untuk menambahkan header CORS
function setCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

// Handler untuk preflight requests (OPTIONS)
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  return setCorsHeaders(response);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const kostOwner = await prisma.kostOwner.findUnique({
      where: {
        id,
      },
    });

    if (!kostOwner) {
      const response = NextResponse.json(
        {
          success: true,
          message: "Data Kost Owner Tidak Ditemukan",
          data: null,
        },
        { status: 404 }
      );
      return setCorsHeaders(response);
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Detail Data Kost Owner",
        data: kostOwner,
      },
      { status: 200 }
    );
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching kost owner by ID:", error);
    const response = NextResponse.json(
      {
        success: false,
        message: "Failed to fetch kost owner by ID",
        error: (error as Error).message,
      },
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const { fullname, noTelp, nik, alamat } = await request.json();

    const kostOwner = await prisma.kostOwner.update({
      where: {
        id,
      },
      data: {
        fullname,
        noTelp,
        nik,
        alamat,
      },
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Data Kost Owner Berhasil Diubah",
        data: kostOwner,
      },
      { status: 200 }
    );
    return setCorsHeaders(response); // <-- Tambahkan ini
  } catch (error) {
    console.error("Error updating kost owner:", error);
    const response = NextResponse.json(
      {
        success: false,
        message: "Failed to update kost owner",
        error: (error as Error).message,
      },
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.kostOwner.delete({
      where: {
        id,
      },
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Data Kost Owner Berhasil Dihapus",
      },
      { status: 200 }
    );
    return setCorsHeaders(response); // <-- Tambahkan ini
  } catch (error) {
    console.error("Error deleting kost owner:", error);
    const response = NextResponse.json(
      {
        success: false,
        message: "Failed to delete kost owner",
        error: (error as Error).message,
      },
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}
