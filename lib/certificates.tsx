interface CertificateProps {
  studentName: string
  courseName: string
  completionDate: string
  instructorName?: string
  certificateId: string
}

export function Certificate({
  studentName,
  courseName,
  completionDate,
  instructorName = "Michael Richards",
  certificateId,
}: CertificateProps) {
  return (
    <div className="w-[800px] h-[600px] bg-white border-8 border-emerald-600 relative overflow-hidden print:shadow-none shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-emerald-600 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border-4 border-emerald-600 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-4 border-emerald-600 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-emerald-600 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="text-center pt-12 pb-8">
        <h1 className="text-4xl font-bold text-emerald-600 mb-2">CERTIFICATE OF COMPLETION</h1>
        <div className="w-32 h-1 bg-emerald-600 mx-auto"></div>
      </div>

      {/* Content */}
      <div className="px-16 text-center">
        <p className="text-lg text-slate-600 mb-8">This is to certify that</p>

        <h2 className="text-5xl font-bold text-slate-900 mb-8 border-b-2 border-emerald-600 pb-4 inline-block">
          {studentName}
        </h2>

        <p className="text-lg text-slate-600 mb-4">has successfully completed the course</p>

        <h3 className="text-3xl font-semibold text-emerald-600 mb-8">{courseName}</h3>

        <p className="text-lg text-slate-600 mb-12">
          at Richards IT Consultancy on{" "}
          <span className="font-semibold">{new Date(completionDate).toLocaleDateString()}</span>
        </p>

        {/* Signatures */}
        <div className="flex justify-between items-end mt-16">
          <div className="text-center">
            <div className="w-48 border-b-2 border-slate-400 mb-2"></div>
            <p className="text-sm text-slate-600">Date</p>
          </div>

          <div className="text-center">
            <div className="w-48 border-b-2 border-slate-400 mb-2"></div>
            <p className="text-sm text-slate-600 font-semibold">{instructorName}</p>
            <p className="text-xs text-slate-500">Instructor & Founder</p>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="absolute bottom-4 right-4 text-xs text-slate-400">Certificate ID: {certificateId}</div>

        {/* Company Logo/Name */}
        <div className="absolute bottom-4 left-4 text-sm text-emerald-600 font-semibold">Richards IT Consultancy</div>
      </div>
    </div>
  )
}

// Updated signature to use studentId and courseSlug
export function generateCertificateId(studentId: number, courseSlug: string): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `RIT-${studentId}-${courseSlug.substring(0, 3).toUpperCase()}-${timestamp}-${random}`.toUpperCase()
}

export function downloadCertificate(certificateElement: HTMLElement, fileName: string) {
  // This would typically use html2canvas and jsPDF
  // For now, we'll use the browser's print functionality
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate - ${fileName}</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            @media print { body { margin: 0; padding: 0; } }
          </style>
        </head>
        <body>
          ${certificateElement.outerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}
