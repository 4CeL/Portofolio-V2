// Generates a placeholder CV at public/cv.pdf (plain PDF 1.4, no dependencies).
// Replace public/cv.pdf with the real CV when it is ready, then delete this script.
import { writeFileSync, mkdirSync } from "node:fs";

const lines = [
  ["F2", 26, "Stefanus Marcellino"],
  ["F1", 12, "Backend Developer Intern & Computer Science Student"],
  ["F1", 10, "Tangerang, Indonesia  |  stefanusmarcellino18@gmail.com"],
  ["F1", 10, " "],
  ["F2", 12, "PLACEHOLDER CV"],
  ["F1", 10, "This file is a dummy. Replace public/cv.pdf with the final CV."],
];

let y = 760;
const text = lines
  .map(([font, size, str]) => {
    const esc = str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    const op = `BT /${font} ${size} Tf 56 ${y} Td (${esc}) Tj ET`;
    y -= size + 14;
    return op;
  })
  .join("\n");
const stream = `0.067 0.067 0.067 rg\n${text}\n0.5 w 56 ${y + 4} m 539 ${y + 4} l S`;

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

mkdirSync("public", { recursive: true });
writeFileSync("public/cv.pdf", pdf, "latin1");
console.log(`public/cv.pdf written (${Buffer.byteLength(pdf)} bytes)`);
