"use client"

import { useRef } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Certificate, generateCertificateId, downloadCertificate } from "@/lib/certificates"

interface CertificateDialogProps {
  student: any
  onClose: () => void
}

export default function CertificateDialog({ student, onClose }: CertificateDialogProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (certificateRef.current) {
      const fileName = `${student.first_name}_${student.last_name}_Certificate`
      downloadCertificate(certificateRef.current, fileName)
    }
  }

  const certificateId = generateCertificateId(student.id, student.course.replace(/\s+/g, "-").toLowerCase())

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Course Completion Certificate</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700">
                <Download className="h-4 w-4 mr-2" />
                Download/Print
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-center p-4">
          <div ref={certificateRef}>
            <Certificate
              studentName={`${student.first_name} ${student.last_name}`}
              courseName={student.course}
              completionDate={student.end_date || new Date().toISOString()}
              certificateId={certificateId}
            />
          </div>
        </div>

        <div className="text-center text-sm text-slate-600 mt-4">
          <p>Certificate ID: {certificateId}</p>
          <p>This certificate can be verified by contacting Richards IT Consultancy</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
