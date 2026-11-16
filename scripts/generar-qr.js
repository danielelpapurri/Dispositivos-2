// Genera los QR de prueba del catálogo en assets/qr/.
// Cada QR guarda SOLO el texto exacto del código (columna codigo de catalogo_qr).
// Uso: npm run qr
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

const codigos = ["AER-001", "AER-002", "AER-003", "AER-004", "QR-TRAMPA"];
const carpeta = path.join(__dirname, "..", "assets", "qr");

async function main() {
  fs.mkdirSync(carpeta, { recursive: true });

  for (const codigo of codigos) {
    const archivo = path.join(carpeta, `${codigo}.png`);
    await QRCode.toFile(archivo, codigo, {
      type: "png",
      width: 600,
      margin: 4,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#FFFFFF" },
    });
    console.log(`QR generado: assets/qr/${codigo}.png  →  "${codigo}"`);
  }
}

main().catch((error) => {
  console.error("No se pudieron generar los QR:", error);
  process.exit(1);
});
