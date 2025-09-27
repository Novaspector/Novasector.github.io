// Google Apps Script code to paste into your Google Sheets script editor
// This will handle incoming form submissions and add them to your spreadsheet

function doPost(e) {
  try {
    // Get the active spreadsheet (make sure to replace with your spreadsheet ID)
    const sheet = SpreadsheetApp.getActiveSheet()

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents)

    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp",
        "Form Type",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Parish",
        "Inquiry/Course",
        "Message/Goals",
        "Budget",
        "Age",
        "Schedule",
        "Education",
        "Experience",
        "Employment",
        "Challenges",
        "Payment",
        "Student Discount",
        "Terms Agreed",
        "Contact Consent",
        "Marketing Consent",
      ]
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length)
      headerRange.setBackground("#4CAF50")
      headerRange.setFontColor("white")
      headerRange.setFontWeight("bold")
    }

    // Prepare row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.formType || "",
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || "",
      data.parish || "",
      data.inquiry || data.course || "",
      data.message || data.goals || "",
      data.budget || "",
      data.age || "",
      data.schedule || "",
      data.education || "",
      data.experience || "",
      data.employment || "",
      data.challenges || "",
      data.payment || "",
      data.studentDiscount || false,
      data.terms || false,
      data.contactConsent || false,
      data.marketingConsent || false,
    ]

    // Add the new row
    sheet.appendRow(rowData)

    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length)

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data saved successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

// Test function to verify the script works
function testFunction() {
  const testData = {
    timestamp: new Date().toISOString(),
    formType: "contact",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "876-123-4567",
    parish: "Kingston",
    inquiry: "Computer Repair",
    message: "This is a test message",
  }

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  }

  const result = doPost(mockEvent)
  console.log(result.getContent())
}
