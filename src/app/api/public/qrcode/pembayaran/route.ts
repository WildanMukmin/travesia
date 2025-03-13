import QRCode from "qrcode";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }

  const url = `https://yourdomain.com/api/public/qrcode/validate?id=${id}`;

  try {
    const qrCodeDataURL = await QRCode.toDataURL(url);
    return new Response(qrCodeDataURL, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (err) {
    return new Response("Error generating QR Code", { status: 500 });
  }
}
