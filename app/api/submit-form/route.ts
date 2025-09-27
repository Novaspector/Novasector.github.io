import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Google Sheets Web App URL - you'll need to replace this with your actual URL
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL || ""

    if (!GOOGLE_SHEETS_URL) {
      console.error("Google Sheets URL not configured")
      return NextResponse.json({ success: false, error: "Configuration error" }, { status: 500 })
    }

    // Prepare the data for Google Sheets
    const sheetData = {
      timestamp: new Date().toISOString(),
      formType: formData.formType || "contact",
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      parish: formData.parish || "",
      inquiry: formData.inquiry || "",
      message: formData.message || "",
      budget: formData.budget || "",
      // Additional fields for signup form
      age: formData.age || "",
      course: formData.course || "",
      schedule: formData.schedule || "",
      education: formData.education || "",
      experience: formData.experience || "",
      employment: formData.employment || "",
      goals: formData.goals || "",
      challenges: formData.challenges || "",
      payment: formData.payment || "",
      studentDiscount: formData.studentDiscount || false,
      terms: formData.terms || false,
      contactConsent: formData.contactConsent || false,
      marketingConsent: formData.marketingConsent || false,
    }

    // Send to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    })

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      data: result,
    })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit form. Please try again.",
      },
      { status: 500 },
    )
  }
}
