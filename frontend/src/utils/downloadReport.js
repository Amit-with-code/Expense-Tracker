// src/utils/downloadReport.js

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadReport = (
  income,
  expense,
  totalIncome,
  totalExpense
) => {
  const doc = new jsPDF();

  // ================= TITLE =================

  doc.setFontSize(22);
  doc.text("Expense Tracker Report", 14, 20);

  // ================= SUMMARY =================

  doc.setFontSize(14);

  doc.text(`Total Income: ₹ ${totalIncome}`, 14, 40);
  doc.text(`Total Expense: ₹ ${totalExpense}`, 14, 50);
  doc.text(
    `Balance: ₹ ${totalIncome - totalExpense}`,
    14,
    60
  );

  // ================= INCOME TABLE =================

  doc.setFontSize(18);
  doc.text("Income Transactions", 14, 80);

  autoTable(doc, {
    startY: 90,
    head: [["Title", "Amount", "Category", "Date"]],
    body: income.map((item) => [
      item.title,
      item.amount,
      item.category,
      item.date?.slice(0, 10),
    ]),
  });

  // ================= EXPENSE TABLE =================

  const finalY = doc.lastAutoTable.finalY + 20;

  doc.setFontSize(18);
  doc.text("Expense Transactions", 14, finalY);

  autoTable(doc, {
    startY: finalY + 10,
    head: [["Title", "Amount", "Category", "Date"]],
    body: expense.map((item) => [
      item.title,
      item.amount,
      item.category,
      item.date?.slice(0, 10),
    ]),
  });

  // ================= SAVE =================

  doc.save("expense-report.pdf");
};