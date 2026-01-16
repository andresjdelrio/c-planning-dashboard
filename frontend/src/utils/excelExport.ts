import * as XLSX from 'xlsx';
import { Initiative } from '../types/initiative';

export const exportInitiativesToExcel = (initiatives: Initiative[]) => {
  // Sort initiatives by OP2 to group them together (same order as display)
  const op2Order = [
    'Data definition',
    'Data capture',
    'Data processing',
    'Data assets',
    'FinOps'
  ];

  const sortedInitiatives = [...initiatives].sort((a, b) => {
    const indexA = op2Order.indexOf(a.op2);
    const indexB = op2Order.indexOf(b.op2);
    if (indexA !== indexB) {
      return indexA - indexB;
    }
    return a.order_index - b.order_index;
  });

  // Prepare data for Excel with all columns
  const excelData = sortedInitiatives.map((initiative) => ({
    'OP1': initiative.op1,
    'OP2': initiative.op2,
    'Team': initiative.team || '',
    'OP3': initiative.op3 || '',
    'Platform': initiative.platform || '',
    'Initiatives': initiative.initiatives || '',
    'C': initiative.c || '',
    'Effort Level': initiative.effort_level || '',
    'Resource': initiative.resource || '',
    'Impact': initiative.impact || '',
    'Priority': initiative.priority || '',
    'Comentarios': initiative.comments || '',
    // Include epics if they exist
    'Epics': initiative.epics && initiative.epics.length > 0
      ? initiative.epics.map((epic, idx) => `${idx + 1}. ${epic.name}`).join('\n')
      : '',
  }));

  // Create workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Set column widths for better readability
  worksheet['!cols'] = [
    { wch: 50 }, // OP1
    { wch: 20 }, // OP2
    { wch: 20 }, // Team
    { wch: 30 }, // OP3
    { wch: 20 }, // Platform
    { wch: 50 }, // Initiatives
    { wch: 10 }, // C
    { wch: 15 }, // Effort Level
    { wch: 15 }, // Resource
    { wch: 12 }, // Impact
    { wch: 12 }, // Priority
    { wch: 40 }, // Comentarios
    { wch: 60 }, // Epics
  ];

  // Enable text wrapping for all cells
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      if (!worksheet[cellAddress]) continue;

      if (!worksheet[cellAddress].s) {
        worksheet[cellAddress].s = {};
      }
      worksheet[cellAddress].s.alignment = {
        wrapText: true,
        vertical: 'top',
      };
    }
  }

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'LVT Planning');

  // Generate filename with current date
  const date = new Date();
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const filename = `LVT_Planning_${dateString}.xlsx`;

  // Download the file
  XLSX.writeFile(workbook, filename);
};
