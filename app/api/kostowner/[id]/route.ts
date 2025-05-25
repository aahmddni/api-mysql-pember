import { NextResponse } from "next/server";

import prisma from "@/prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const kostOwner = await prisma.kostOwner.findUnique({
    where: {
      id,
    },
  });

  if (!kostOwner) {
    return NextResponse.json(
      {
        success: true,
        message: "Data Kost Owner Tidak Ditemukan",
        data: null,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Detail Data Kost Owner",
      data: kostOwner,
    },
    {
      status: 200,
    }
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

  return NextResponse.json(
    {
      success: true,
      message: "Data Kost Owner Berhasil Diubah",
      data: kostOwner,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  await prisma.kostOwner.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "Data Kost Owner Berhasil Dihapus",
    },
    {
      status: 200,
    }
  );
}
