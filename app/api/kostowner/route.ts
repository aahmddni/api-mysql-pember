import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

function setCorsHeaders(response: NextResponse) {
  // **UNTUK DEVELOPMENT ONLY!** Izinkan semua origin.
  // Untuk produksi, ganti '*' dengan origin spesifik Flutter Anda: 'http://localhost:59912'
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

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  return setCorsHeaders(response);
}

export async function GET() {
  try {
    const kostOwner = await prisma.kostOwner.findMany();
    const response = NextResponse.json(
      {
        success: true,
        message: "List Data Kost Owner",
        data: kostOwner,
      },
      { status: 200 }
    );
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching kost owners:", error);
    const response = NextResponse.json(
      {
        success: false,
        message: "Failed to fetch kost owners",
        error: (error as Error).message,
      },
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}

export async function POST(request: Request) {
  try {
    const { fullname, noTelp, nik, alamat, userId } = await request.json();

    const kostOwner = await prisma.kostOwner.create({
      data: {
        fullname,
        noTelp,
        nik,
        alamat,
        userId,
      },
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Data Kost Owner Berhasil Ditambahkan",
        data: kostOwner,
      },
      { status: 201 }
    );
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error creating kost owner:", error);
    const response = NextResponse.json(
      {
        success: false,
        message: "Failed to add kost owner",
        error: (error as Error).message,
      },
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}
