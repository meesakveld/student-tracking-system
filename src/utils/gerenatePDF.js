import PDFDocument from 'pdfkit-table';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '../../');

export const generatePdf = async (title, headers, rows, columnsSize) => {
    // Generate the PDF document
    const doc = new PDFDocument();
    const filePath = path.join(rootPath, 'output.pdf')

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
        columnsSize: columnsSize,
        prepareHeader: (row, rectHeader) => {
            doc.font("Helvetica-Bold").fontSize(10);
        },
        prepareRow: (row, i) => {
            doc.font("Helvetica").fontSize(9);
        },
    });

    // Finalize the PDF document
    doc.end();

    // Return a promise that resolves when the stream is finished
    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};