import CryptoJS from 'crypto-js';
import escpos from 'escpos';
import escposUSB from 'escpos-usb';
// import escpos.USB from 'escpos-usb';
import { createWriteStream } from 'fs';
import PDFDocument from 'pdfkit';
import {
  PrinterTypes,
  ThermalPrinter,
  CharacterSet,
} from 'node-thermal-printer';

escpos.USB = escposUSB;
export function encryptHash(mapString: string, key1: string, key2: string) {
  return CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(mapString.substr(0, mapString.length - 1)),
    CryptoJS.enc.Utf8.parse(key1),
    {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(key2),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );
}

export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const hashString = (tranPayload, hsHash = true) => {
  let str = '';
  Object.keys(tranPayload).map((rt) => {
    // mapString += $(this).attr('id') + '=' + $(this).val() + '&';

    str += rt + '=' + tranPayload[rt] + '&';
  });

  const hashToken = encryptHash(str, 'WNhZYm4jk33CutAA', '6451025684399433');

  hsHash
    ? (tranPayload.HS_RequestHash = hashToken.toString())
    : (tranPayload.RequestHash = hashToken.toString());
};

export const generateRandomPrimaryKey = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 26; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

export const formatDateTime = (dateObj = new Date()) => {
  const pad = (num) => num.toString().padStart(2, '0');

  const day = pad(dateObj.getDate());
  const month = pad(dateObj.getMonth() + 1); // Months are zero-based
  const year = dateObj.getFullYear();

  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());
  const seconds = pad(dateObj.getSeconds());

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { formattedDate, formattedTime };
};

export const printReceipt = (
  invoice,
  formattedDate,
  formattedTime,
  searchedProducts,
  userNames,
  paymentMode,
  table_no?: string,
) => {
  const devices = escposUSB.findPrinter();
  const device = new escpos.USB();
  const options = { encoding: 'GB18030' };
  const printer: any = new escpos.Printer(device, options);

  device.open(function (error) {
    if (error) {
      console.error('Printer open error:', error);
      return { success: false, message: 'Error opening printer', error };
    }

    // const printer = new ThermalPrinter({
    //   type: PrinterTypes.EPSON,
    //   interface: 'usb',
    //   width: 48,
    //   characterSet: CharacterSet.SLOVENIA,
    //   removeSpecialCharacters: false,
    //   lineCharacter: '-',
    // });

    // // Switch to smaller font (Font B)
    // printer.raw(Buffer.from([0x1b, 0x4d, 0x01]));

    printer
      .align('CT')
      .font('B')
      .style('B')
      .size(0.9, 0.9) // Smaller heading
      .text('Butt Karahi')
      .style('NORMAL') // Reset style
      .size(0.9, 0.9) // Default font size for body
      .text('Branch: Leytonstone')
      .text('485 High Road')
      .text('Leytonstone, London')
      .text('E11 4PG')
      .text('')
      .text(`Table - ${table_no ?? '01'}`)
      .text('--------------------------------')
      .align('CT')
      .text('QTY ITEM NAME      PRICE  AMOUNT')
      .text('--------------------------------');

    let subTotal = 0;
    searchedProducts.forEach((item, i) => {
      const qty = +item.quantity;
      const price = +item.unit_price;
      const amount = +price * +qty;
      subTotal += amount;

      const itemName = item?.menu_item?.name
        ? item?.menu_item?.name.toLowerCase()
        : 'Unknown';
      printer.text(
        `${qty.toString().padEnd(2)}${itemName.slice(0, 13).padEnd(16, '.')}  ${price.toFixed(
          2,
        )}${amount.toFixed(2).padStart(6)}`,
      );
      if (i !== searchedProducts.length - 1) {
        printer.text('');
      }
    });

    const vatAmount = subTotal * 0;
    const total = +subTotal; // Since prices include tax

    // Print totals and payment info
    printer
      .font('B')
      .text('--------------------------------')
      // .text(`Net Subtotal               ${(total - vatAmount).toFixed(2)}`)
      // .text(`VAT (0%)                  ${vatAmount.toFixed(2)}`)
      .text(`Total to Pay               ${total.toFixed(2)}`)
      .text('--------------------------------')
      .text('Received')
      .text(
        `${paymentMode === 'card' ? 'VISA' : 'Cash'}                      ${total.toFixed(2)}`,
      )
      // .text(`Card Number:           ${invoice.cardNumber || '9999'}`)
      // .text(`Remaining Balance:     ${invoice.remainingBalance || '0.00'}`)
      // .text(`Ref Num:               ${invoice.reference || 'N/A'}`)
      .text('');

    // ✅ Center align for footer
    printer
      .font('B')
      .align('CT')
      .text(`${formattedDate}     ${formattedTime}`)
      .text(`Cashier: ${userNames}`)
      .text('')
      .text('Thanks for dining at Butt Karahi!')
      .text('Visit us again for the authentic taste of Pakistan.')
      .cut()
      .close();

    return { success: true, message: 'Receipt printed successfully' };
  });
};

export const saveReceiptAsPdf = (
  invoice,
  formattedDate,
  formattedTime,
  searchedProducts,
  userNames,
  paymentMode,
  table_no,
) => {
  const doc = new PDFDocument();
  const filePath = `receipt_${Date.now()}.pdf`;
  doc.pipe(createWriteStream(filePath));

  // Header
  doc.fontSize(20).text('Butt Karahi', { align: 'center' });
  doc.fontSize(12).text('Branch: Leytonstone', { align: 'center' });
  doc.text('483 High Road, Leytonstone, London, E11 4PG', { align: 'center' });
  doc.text('VAT: 20% (inclusive)', { align: 'center' });
  doc.moveDown();
  doc.text(`Table - ${table_no}`, { align: 'center' });

  // Use monospaced font for body
  doc.moveDown();
  // doc.font('Courier-Bold').fontSize(10);
  doc.text('QTY  Item Name            Price     Amount', { align: 'center' });

  let subTotal = 0;
  searchedProducts.forEach((item) => {
    const qty = item.quantity;
    const price = item.unit_price;
    const amount = qty * price;
    subTotal += amount;

    const line = `${qty.toString().padEnd(4)} ${item.menu_item.name.padEnd(20)} ${price} ${amount}`;
    doc.text(line, { align: 'center' });
  });

  const vatAmount = subTotal * 0.2;
  const total = subTotal;

  // Totals
  doc.moveDown();
  doc.text(
    `Net Subtotal:           ${(total - vatAmount).toFixed(2).padStart(8)}`,
    { align: 'center' },
  );
  doc.text(`VAT (20%):              ${vatAmount.toFixed(2).padStart(8)}`, {
    align: 'center',
  });
  doc.text(`Total to Pay:           ${total.toFixed(2).padStart(8)}`, {
    align: 'center',
  });

  // Payment Info
  doc.moveDown();
  doc.text(
    `Payment Method:         ${paymentMode === 'card' ? 'VISA' : 'Cash'}`,
    { align: 'center' },
  );
  doc.text(`Amount Paid:            ${total.toFixed(2).padStart(8)}`, {
    align: 'center',
  });
  doc.text(`Card Number:            ${invoice.cardNumber || '9999'}`, {
    align: 'center',
  });
  doc.text(`Remaining Balance:      ${invoice.remainingBalance || '0.00'}`, {
    align: 'center',
  });
  doc.text(`Reference Number:       ${invoice.reference || 'N/A'}`, {
    align: 'center',
  });

  // Footer
  doc.moveDown();
  doc.font('Helvetica'); // switch back to regular font
  doc.text(`Date: ${formattedDate}   Time: ${formattedTime}`, {
    align: 'center',
  });
  doc.text(`Cashier: ${userNames}`, { align: 'center' });
  doc.moveDown();
  doc.text('Thanks for dining at Butt Karahi!', { align: 'center' });
  doc.text('Visit us again for the authentic taste of Pakistan.', {
    align: 'center',
  });

  doc.end();

  return filePath;
};
