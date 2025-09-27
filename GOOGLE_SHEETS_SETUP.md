# Google Sheets Integration Setup Guide

Follow these steps to set up form data collection in Google Sheets:

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Richards IT Consultancy - Form Submissions"
4. Note down the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## Step 2: Set up Google Apps Script
1. In your Google Sheet, go to `Extensions` > `Apps Script`
2. Delete any existing code in the script editor
3. Copy and paste the code from `scripts/google-apps-script.js`
4. Save the project (Ctrl+S or Cmd+S)
5. Name your project "Form Submission Handler"

## Step 3: Deploy as Web App
1. In the Apps Script editor, click `Deploy` > `New deployment`
2. Click the gear icon next to "Type" and select "Web app"
3. Set the following:
   - Description: "Form submission handler"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click `Deploy`
5. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 4: Update Environment Variable
1. In your Vercel dashboard or deployment settings, add an environment variable:
   - Name: `GOOGLE_SHEETS_URL`
   - Value: The Web App URL you copied in step 3

## Step 5: Test the Integration
1. Deploy your website with the new environment variable
2. Submit a test form on your contact or signup page
3. Check your Google Sheet - you should see the data appear automatically

## Troubleshooting
- If forms aren't submitting, check the browser console for errors
- Make sure the Google Apps Script is deployed as a web app with "Anyone" access
- Verify the `GOOGLE_SHEETS_URL` environment variable is set correctly
- Check the Apps Script execution log for any errors

## Data Structure
The spreadsheet will automatically create columns for:
- Timestamp
- Form Type (contact/signup)
- Personal Information (name, email, phone, parish)
- Form-specific data (inquiry type, course selection, etc.)
- Consent and agreement checkboxes

## Security Notes
- The Google Apps Script runs with your Google account permissions
- Form data is stored in your private Google Sheet
- Only you have access to view and manage the data
- Consider setting up data retention policies as needed
