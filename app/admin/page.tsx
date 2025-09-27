"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Clock, User, Mail, Phone, Eye, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { studentDB } from "@/lib/supabase"

// Mock data for applications - replace with real database calls
const mockApplications = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "876-555-0101",
    age: 24,
    parish: "Kingston",
    course: "Web Development Basics",
    schedule: "weekday-evening",
    education: "university",
    experience: "basic",
    employment: "employed",
    goals: "I want to learn web development to start freelancing and eventually build my own business website.",
    challenges: "I work full-time so need evening classes",
    payment: "split-payment",
    studentDiscount: false,
    status: "pending",
    submittedAt: "2024-03-10T10:30:00Z",
  },
  {
    id: 2,
    firstName: "Marcus",
    lastName: "Brown",
    email: "marcus.brown@email.com",
    phone: "876-555-0102",
    age: 45,
    parish: "St. Andrew",
    course: "Basic Computer Skills",
    schedule: "saturday-morning",
    education: "secondary",
    experience: "none",
    employment: "self-employed",
    goals:
      "I run a small shop and want to learn to use computers for my business records and maybe create social media presence.",
    challenges: "Complete beginner with computers, need patient instruction",
    payment: "full-cash",
    studentDiscount: false,
    status: "approved",
    submittedAt: "2024-03-09T14:15:00Z",
  },
  {
    id: 3,
    firstName: "Keisha",
    lastName: "Williams",
    email: "keisha.williams@email.com",
    phone: "876-555-0103",
    age: 19,
    parish: "St. Catherine",
    course: "Python Programming",
    schedule: "weekday-afternoon",
    education: "college",
    experience: "intermediate",
    employment: "student",
    goals: "I'm studying computer science and want to strengthen my programming skills for better job prospects.",
    challenges: "",
    payment: "full-transfer",
    studentDiscount: true,
    status: "rejected",
    submittedAt: "2024-03-08T16:45:00Z",
    rejectionReason:
      "Course level too advanced for current experience. Recommended starting with Basic Computer Skills.",
  },
]

export default function AdminPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [students, setStudents] = useState([])
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalStudents: 0,
    activeStudents: 0,
    completedStudents: 0,
    pendingApplications: 0,
  })
  const { toast } = useToast()

  // Load real data and calculate accurate stats
  useEffect(() => {
    async function loadData() {
      try {
        // Load students from database
        const studentsData = await studentDB.getAllStudents()
        setStudents(studentsData)

        // Calculate accurate statistics
        const totalStudents = studentsData.filter((s) => !s.is_temp).length
        const activeStudents = studentsData.filter((s) => s.status === "active").length
        const completedStudents = studentsData.filter((s) => s.status === "completed").length
        const pendingApplications = applications.filter((a) => a.status === "pending").length

        setStats({
          totalApplications: applications.length,
          totalStudents,
          activeStudents,
          completedStudents,
          pendingApplications,
        })
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [applications])

  const handleApprove = async (id: number) => {
    const application = applications.find((app) => app.id === id)
    if (!application) return

    try {
      // Add to students database
      const studentData = {
        first_name: application.firstName,
        last_name: application.lastName,
        email: application.email,
        phone: application.phone,
        parish: application.parish,
        course: application.course,
        status: "active",
        start_date: new Date().toISOString().split("T")[0],
        weeks_total: getDefaultWeeksForCourse(application.course),
        weeks_completed: 0,
        days_attended: 0,
        total_days: getDefaultWeeksForCourse(application.course) * 4,
        payment_status: "unpaid",
        notes: `Approved from application. Goals: ${application.goals}`,
        is_temp: false,
      }

      // Calculate end date
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + studentData.weeks_total * 7)
      studentData.end_date = endDate.toISOString().split("T")[0]

      await studentDB.addStudent(studentData)

      // Update application status
      setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "approved" } : app)))

      toast({
        title: "Application Approved",
        description: `${application.firstName} ${application.lastName} has been enrolled as a student.`,
      })

      // Refresh students data
      const updatedStudents = await studentDB.getAllStudents()
      setStudents(updatedStudents)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive",
      })
    }
  }

  const handleReject = (id: number, reason: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "rejected", rejectionReason: reason } : app)),
    )

    toast({
      title: "Application Rejected",
      description: "The applicant will be notified with feedback.",
    })
  }

  const getDefaultWeeksForCourse = (courseName: string): number => {
    const courseWeeks = {
      "Basic Computer Skills": 4,
      "Microsoft Office Mastery": 6,
      "Web Development Basics": 8,
      "Python Programming": 8,
      "Digital Marketing Basics": 5,
      "Smartphone & Tablet Mastery": 3,
    }
    return courseWeeks[courseName] || 8
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const pendingApplications = applications.filter((app) => app.status === "pending")
  const approvedApplications = applications.filter((app) => app.status === "approved")
  const rejectedApplications = applications.filter((app) => app.status === "rejected")

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Course Applications Dashboard</h1>
          <p className="text-slate-600">Review and manage student applications for IT training classes</p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-4">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Applications</p>
                    <p className="text-3xl font-bold text-slate-900">{stats.totalApplications}</p>
                  </div>
                  <User className="h-8 w-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pending Review</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pendingApplications}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Students</p>
                    <p className="text-3xl font-bold text-green-600">{stats.activeStudents}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Completed</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.completedStudents}</p>
                  </div>
                  <Award className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Students</p>
                    <p className="text-3xl font-bold text-emerald-600">{stats.totalStudents}</p>
                  </div>
                  <User className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications Tabs */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedApplications.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingApplications.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Pending Applications</h3>
                    <p className="text-slate-600">All applications have been reviewed.</p>
                  </CardContent>
                </Card>
              ) : (
                pendingApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onViewDetails={setSelectedApplication}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedApplications.map((app) => (
                <ApplicationCard key={app.id} application={app} onViewDetails={setSelectedApplication} readonly />
              ))}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {rejectedApplications.map((app) => (
                <ApplicationCard key={app.id} application={app} onViewDetails={setSelectedApplication} readonly />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <ApplicationDetailsDialog application={selectedApplication} onClose={() => setSelectedApplication(null)} />
      )}
    </div>
  )
}

function ApplicationCard({
  application,
  onApprove,
  onReject,
  onViewDetails,
  readonly = false,
}: {
  application: any
  onApprove?: (id: number) => void
  onReject?: (id: number, reason: string) => void
  onViewDetails: (app: any) => void
  readonly?: boolean
}) {
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const handleReject = () => {
    if (onReject && rejectReason.trim()) {
      onReject(application.id, rejectReason)
      setShowRejectDialog(false)
      setRejectReason("")
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {application.firstName} {application.lastName}
            </h3>
            <p className="text-slate-600">{application.course}</p>
          </div>
          {getStatusBadge(application.status)}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-slate-600">
              <Mail className="h-4 w-4 mr-2" />
              {application.email}
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Phone className="h-4 w-4 mr-2" />
              {application.phone}
            </div>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              <strong>Age:</strong> {application.age}
            </p>
            <p>
              <strong>Parish:</strong> {application.parish}
            </p>
            <p>
              <strong>Experience:</strong> {application.experience}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-2">
            <strong>Goals:</strong>
          </p>
          <p className="text-sm text-slate-700 line-clamp-2">{application.goals}</p>
        </div>

        {application.status === "rejected" && application.rejectionReason && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Rejection Reason:</strong>
            </p>
            <p className="text-sm text-red-700">{application.rejectionReason}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Submitted: {new Date(application.submittedAt).toLocaleDateString()}</p>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(application)}>
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>

            {!readonly && application.status === "pending" && (
              <>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => onApprove?.(application.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>

                <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject Application</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for rejecting this application. This will help the applicant understand
                        and potentially reapply.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="reason">Rejection Reason</Label>
                        <Textarea
                          id="reason"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Explain why this application is being rejected..."
                          className="mt-1"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
                          Reject Application
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ApplicationDetailsDialog({ application, onClose }: { application: any; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Application Details
            {getStatusBadge(application.status)}
          </DialogTitle>
          <DialogDescription>
            Complete application information for {application.firstName} {application.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Name:</strong> {application.firstName} {application.lastName}
              </div>
              <div>
                <strong>Age:</strong> {application.age}
              </div>
              <div>
                <strong>Email:</strong> {application.email}
              </div>
              <div>
                <strong>Phone:</strong> {application.phone}
              </div>
              <div>
                <strong>Parish:</strong> {application.parish}
              </div>
              <div>
                <strong>Employment:</strong> {application.employment}
              </div>
            </div>
          </div>

          {/* Course Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Course Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Course:</strong> {application.course}
              </div>
              <div>
                <strong>Schedule:</strong> {application.schedule}
              </div>
              <div>
                <strong>Payment Method:</strong> {application.payment}
              </div>
              <div>
                <strong>Student Discount:</strong> {application.studentDiscount ? "Yes" : "No"}
              </div>
            </div>
          </div>

          {/* Background */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Background</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Education:</strong> {application.education}
              </div>
              <div>
                <strong>Computer Experience:</strong> {application.experience}
              </div>
            </div>
          </div>

          {/* Goals and Challenges */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Goals & Challenges</h3>
            <div className="space-y-3">
              <div>
                <strong className="block mb-1">Goals:</strong>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded">{application.goals}</p>
              </div>
              {application.challenges && (
                <div>
                  <strong className="block mb-1">Challenges/Special Needs:</strong>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded">{application.challenges}</p>
                </div>
              )}
            </div>
          </div>

          {/* Rejection Reason (if applicable) */}
          {application.status === "rejected" && application.rejectionReason && (
            <div>
              <h3 className="font-semibold text-lg mb-3 border-b pb-2 text-red-800">Rejection Reason</h3>
              <p className="text-sm text-red-700 bg-red-50 p-3 rounded">{application.rejectionReason}</p>
            </div>
          )}

          {/* Submission Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Submission Details</h3>
            <div className="text-sm">
              <div>
                <strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleString()}
              </div>
              <div>
                <strong>Application ID:</strong> #{application.id}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}
