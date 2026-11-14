// The Last Table — waitlist signups from thelasttablechicago.com, one row each, in a Google Sheet.
//
// The site's signup forms (the coming-soon page, /waitlist and, after launch, the footer and the
// Reservations page) post here once this script is deployed as a web app and its URL is set as
// `forms.newsletter` in content/site.js. Set-up steps are in this folder's README.
//
// Columns: Signed up · First name · Email · Signed up from · Invited to grand opening ·
// Told reservations are open · Notes. The two "Invited/Told" columns are checkboxes for the team.

// The spreadsheet's ID (the long code in its address). Leave empty when this script is opened from the
// sheet itself (Extensions → Apps Script).
const SHEET_ID = '';
const TAB = 'Waitlist';
const HEADERS = ['Signed up', 'First name', 'Email', 'Signed up from', 'Invited to grand opening', 'Told reservations are open', 'Notes'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p._gotcha) return reply_({ ok: true }); // the hidden field only bots fill in
  const email = String(p.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) return reply_({ ok: false, error: 'Please add a valid email.' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = sheet_();
    const last = sheet.getLastRow();
    const known = last > 1 ? sheet.getRange(2, 3, last - 1, 1).getValues().map((r) => String(r[0]).toLowerCase()) : [];
    if (!known.includes(email)) { // one row per guest, however many times they sign up
      sheet.appendRow([new Date(), plain_(p.first_name, 80), plain_(email, 254), plain_(p.source, 80), false, false, '']);
      sheet.getRange(sheet.getLastRow(), 5, 1, 2).insertCheckboxes();
    }
  } finally {
    lock.releaseLock();
  }
  return reply_({ ok: true });
}

// Opening the web app's address in a browser shows this, which confirms the deployment works.
function doGet() {
  return ContentService.createTextOutput('The Last Table waitlist is connected. Signups land in the "' + TAB + '" tab.');
}

// Run once from the editor (or let the first signup do it): headers, checkboxes, Chicago time.
function setup() {
  const sheet = sheet_();
  sheet.getParent().setSpreadsheetTimeZone('America/Chicago');
  const rows = Math.max(sheet.getLastRow() - 1, 0);
  if (rows) sheet.getRange(2, 5, rows, 2).insertCheckboxes();
}

function sheet_() {
  const book = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(TAB);
  if (!sheet) {
    sheet = book.getSheets()[0];
    sheet.setName(TAB);
  }
  if (sheet.getRange(1, 1).getValue() !== HEADERS[0]) sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  if (sheet.getFrozenRows() === 0) { // first run: format the header row and columns once
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('mmm d, yyyy h:mm am/pm');
    sheet.setColumnWidths(1, HEADERS.length, 170);
    sheet.setColumnWidth(3, 260);
  }
  return sheet;
}

// Guest text goes in as plain text, never as a formula.
function plain_(value, max) {
  const s = String(value || '').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
