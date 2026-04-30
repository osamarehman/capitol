/**
 * Google Apps Script — deploy this on the Carolina leads Google Sheet.
 *
 * SETUP INSTRUCTIONS:
 * 1. Open the Google Sheet: https://docs.google.com/spreadsheets/d/1U_sXFixHyLMYXKVsMDO62uLMMKnZZLJhEQ9EGjDv7zY/edit
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Deploy → New deployment
 * 5. Select type: "Web app"
 * 6. Set "Execute as": Me
 * 7. Set "Who has access": Anyone
 * 8. Click Deploy and copy the web app URL
 * 9. Paste the URL into /root/capitol/webstudio-carolina/.env as GOOGLE_SHEETS_WEBHOOK=<url>
 * 10. Rebuild Carolina: cd /root/capitol/webstudio-carolina && bash deploy.sh
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Message',
        'Form Name',
        'Page URL',
        'Source Page',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign'
      ]);
    }

    // Append the lead data
    sheet.appendRow([
      new Date().toISOString(),
      data.name || data.Name || data.first_name || '',
      data.email || data.Email || '',
      data.phone || data.Phone || data.tel || '',
      data.message || data.Message || data.comments || '',
      data.form_name || data._form_name || 'unknown',
      data.page_url || data._page_url || '',
      data.source_page || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'carolina-leads-webhook' }))
    .setMimeType(ContentService.MimeType.JSON);
}
