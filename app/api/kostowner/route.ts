import { NextResponse } from "next/server";

import prisma from "@/prisma/client";

export async function GET() {
  const kostOwner = await prisma.kostOwner.findMany();
  return NextResponse.json(
    {
      success: true,
      message: "List Data Kost Owner",
      data: kostOwner,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
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

  return NextResponse.json(
    {
      success: true,
      message: "Data Kost Owner Berhasil Ditambahkan",
      data: kostOwner,
    },
    {
      status: 201,
    }
  );
}
