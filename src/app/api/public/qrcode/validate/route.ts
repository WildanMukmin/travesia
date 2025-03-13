const usedIds = new Set<string>(); // Simulasi database sementara

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }

  // Cek apakah ID sudah digunakan
  if (usedIds.has(id)) {
    return new Response(JSON.stringify({ error: "QR Code expired" }), {
      status: 410, // 410 Gone
    });
  }

  // Tandai ID sudah digunakan
  usedIds.add(id);

  return new Response(
    JSON.stringify({ message: "Payment verified successfully!" }),
    { status: 200 },
  );
}
