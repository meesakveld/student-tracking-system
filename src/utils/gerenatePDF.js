import PDFDocument from 'pdfkit-table';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const generatePdf = async (title, headers, rows) => {
    // Generate the PDF document
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, '../../output.pdf'); // Adjust the path as necessary

    // Generate PDF using a stream
    const stream = doc.pipe(fs.createWriteStream(filePath));

    // Add title to the PDF
    doc.fontSize(16).text(title, { align: 'center' });
    doc.moveDown();

    // Define the table structure
    const tableData = {
        headers: headers,
        rows: rows,
    };

    // Add the table to the PDF
    doc.table(tableData, {
        prepareHeader: (row, rectHeader) => {
            doc.font("Helvetica-Bold").fontSize(8);
        },
        prepareRow: (row, i) => {
            doc.font("Helvetica").fontSize(10);
        }
    });

    // Finalize the PDF document
    doc.end();

    // Return a promise that resolves when the stream is finished
    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};