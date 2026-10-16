import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, serviceType, cadastralNumber, message, fileName } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Пожалуйста, укажите имя и номер телефона" },
        { status: 400 }
      );
    }

    const [newInquiry] = await db
      .insert(inquiries)
      .values({
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : null,
        serviceType: serviceType ? String(serviceType).trim() : "Общая консультация",
        cadastralNumber: cadastralNumber ? String(cadastralNumber).trim() : null,
        message: message ? String(message).trim() : null,
        fileName: fileName ? String(fileName).trim() : null,
        status: "new"
      })
      .returning();

    return NextResponse.json({
      success: true,
      id: newInquiry.id,
      message: "Заявка успешно зарегистрирована. Специалисты ООО «МГП» свяжутся с вами в ближайшее рабочее время."
    });
  } catch (error: any) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при сохранении заявки. Попробуйте еще раз." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const list = await db.select().from(inquiries).orderBy(inquiries.createdAt);
    return NextResponse.json({ success: true, list });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
