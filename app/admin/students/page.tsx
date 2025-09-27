"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Users,
  Plus,
  Search,
  Filter,
  Calendar,
  UserX,
  Edit,
  Trash2,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { studentDB } from "@/lib/supabase"
import CertificateDialog from "@/components/certificate-dialog" // Import the dedicated component

// Mock database functions - replace with actual database calls
const courses = [
  { id: "basic-computer", name: "Basic Computer Skills", defaultWeeks: 4 },
  { id: "microsoft-office", name: "Microsoft Office Mastery", defaultWeeks: 6 },
  { id: "web-development", name: "Web Development Basics", defaultWeeks: 8 },
  { id: "python-programming", name: "Python Programming", defaultWeeks: 8 },
  { id: "digital-marketing", name: "Digital Marketing Basics", defaultWeeks: 5 },
  { id: "smartphone-tablet", name: "Smartphone & Tablet Mastery", defaultWeeks: 3 },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "completed":
      return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
    case "expelled":
      return <Badge className="bg-red-100 text-red-800">Expelled</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getPaymentBadge(status: string) {
  switch (status) {
    case "paid":
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>
    case "partial":
      return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
    case "unpaid":
      return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showExpelDialog, setShowExpelDialog] = useState(false)
  const [studentToExpel, setStudentToExpel] = useState<any>(null)
  const { toast } = useToast()
  const [showCertificateDialog, setShowCertificateDialog] = useState(false)
  const [certificateStudent, setCertificateStudent] = useState<any>(null)

  // Filter students based on search and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch = `${student.firstName} ${student.lastName} ${student.email} ${student.course}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const activeStudents = students.filter((s) => s.status === "active")
  const completedStudents = students.filter((s) => s.status === "completed")
  const expelledStudents = students.filter((s) => s.status === "expelled")
  const tempUsers = students.filter((s) => s.isTemp)

  // Auto-update student status based on end date
  useEffect(() => {
    const checkStudentStatus = () => {
      const today = new Date()
      setStudents((prev) =>
        prev.map((student) => {
          if (student.status === "active" && student.endDate) {
            const endDate = new Date(student.endDate)
            if (today > endDate) {
              return { ...student, status: "completed" }
            }
          }
          return student
        }),
      )
    }

    // Check daily
    const interval = setInterval(checkStudentStatus, 24 * 60 * 60 * 1000)
    checkStudentStatus() // Check immediately

    return () => clearInterval(interval)
  }, [])

  // Load students from database
  useEffect(() => {
    async function loadStudents() {
      try {
        const { data, error } = await studentDB.getAllStudents() // Get data and error from normalized response
        if (error) throw error
        setStudents(data || []) // Ensure data is an array, default to empty if null
      } catch (error) {
        console.error("Error loading students:", error)
        toast({
          title: "Error",
          description: "Failed to load students",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  // Update handleAddStudent function
  const handleAddStudent = async (studentData: any) => {
    try {
      const newStudent = await studentDB.addStudent({
        ...studentData,
        status: "active",
        weeks_completed: 0,
        days_attended: 0,
        total_days: studentData.weeksTotal * 4,
        is_temp: false,
      })

      setStudents((prev) => [newStudent, ...prev])
      toast({
        title: "Student Added",
        description: `${studentData.firstName} ${studentData.lastName} has been enrolled successfully.`,
      })
      setShowAddDialog(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      })
    }
  }

  // Update handleExpelStudent function
  const handleExpelStudent = async (student: any, reason: string) => {
    try {
      await studentDB.updateStatus(student.id, "expelled", `${student.notes}\n\nEXPELLED: ${reason}`)

      setStudents((prev) =>
        prev.map((s) =>
          s.id === student.id ? { ...s, status: "expelled", notes: `${s.notes}\n\nEXPELLED: ${reason}` } : s,
        ),
      )

      toast({
        title: "Student Expelled",
        description: `${student.firstName} ${student.lastName} has been expelled from the course.`,
        variant: "destructive",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to expel student",
        variant: "destructive",
      })
    }

    setShowExpelDialog(false)
    setStudentToExpel(null)
  }

  // Update handleDeleteTempUser function
  const handleDeleteTempUser = async (studentId: number) => {
    try {
      await studentDB.deleteStudent(studentId)
      setStudents((prev) => prev.filter((s) => s.id !== studentId))
      toast({
        title: "Temporary User Deleted",
        description: "The temporary user has been removed from the system.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const handleGenerateCertificate = (student: any) => {
    setCertificateStudent(student)
    setShowCertificateDialog(true)
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Management</h1>
              <p className="text-slate-600">Manage all your students, track progress, and handle enrollments</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowAddDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
          </div>
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
                    <p className="text-sm font-medium text-slate-600">Total Students</p>
                    <p className="text-3xl font-bold text-slate-900">{students.filter((s) => !s.isTemp).length}</p>
                  </div>
                  <Users className="h-8 w-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active</p>
                    <p className="text-3xl font-bold text-green-600">{activeStudents.length}</p>
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
                    <p className="text-3xl font-bold text-blue-600">{completedStudents.length}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Expelled</p>
                    <p className="text-3xl font-bold text-red-600">{expelledStudents.length}</p>
                  </div>
                  <UserX className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Temp Users</p>
                    <p className="text-3xl font-bold text-yellow-600">{tempUsers.length}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search students by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="expelled">Expelled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Students Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Students ({filteredStudents.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeStudents.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedStudents.length})</TabsTrigger>
              <TabsTrigger value="temp">Temp Users ({tempUsers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewDetails={setSelectedStudent}
                  onExpel={(student) => {
                    setStudentToExpel(student)
                    setShowExpelDialog(true)
                  }}
                  onDelete={student.isTemp ? handleDeleteTempUser : undefined}
                  onGenerateCertificate={handleGenerateCertificate}
                />
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {activeStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewDetails={setSelectedStudent}
                  onExpel={(student) => {
                    setStudentToExpel(student)
                    setShowExpelDialog(true)
                  }}
                  onGenerateCertificate={handleGenerateCertificate}
                />
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewDetails={setSelectedStudent}
                  readonly
                  onGenerateCertificate={handleGenerateCertificate}
                />
              ))}
            </TabsContent>

            <TabsContent value="temp" className="space-y-4">
              {tempUsers.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewDetails={setSelectedStudent}
                  onDelete={handleDeleteTempUser}
                  isTemp
                  onGenerateCertificate={handleGenerateCertificate}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Add Student Dialog */}
      <AddStudentDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddStudent}
        courses={courses}
      />

      {/* Expel Student Dialog */}
      <ExpelStudentDialog
        open={showExpelDialog}
        student={studentToExpel}
        onClose={() => {
          setShowExpelDialog(false)
          setStudentToExpel(null)
        }}
        onExpel={handleExpelStudent}
      />

      {/* Student Details Dialog */}
      {selectedStudent && (
        <StudentDetailsDialog
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onUpdate={(updatedStudent) => {
            setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)))
            setSelectedStudent(null)
          }}
        />
      )}

      {/* Certificate Dialog (now imported) */}
      {showCertificateDialog && certificateStudent && (
        <CertificateDialog
          student={certificateStudent}
          onClose={() => {
            setShowCertificateDialog(false)
            setCertificateStudent(null)
          }}
        />
      )}
    </div>
  )
}

function StudentCard({
  student,
  onViewDetails,
  onExpel,
  onDelete,
  readonly = false,
  isTemp = false,
  onGenerateCertificate,
}: {
  student: any
  onViewDetails: (student: any) => void
  onExpel?: (student: any) => void
  onDelete?: (id: number) => void
  readonly?: boolean
  isTemp?: boolean
  onGenerateCertificate?: (student: any) => void
}) {
  const progressPercentage =
    student.weeksTotal > 0 ? Math.round((student.weeksCompleted / student.weeksTotal) * 100) : 0

  const attendancePercentage = student.totalDays > 0 ? Math.round((student.daysAttended / student.totalDays) * 100) : 0

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {student.firstName} {student.lastName}
              </h3>
              {isTemp && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  TEMP
                </Badge>
              )}
            </div>
            <p className="text-slate-600 mb-1">{student.course}</p>
            <p className="text-sm text-slate-500">
              {student.email} • {student.phone}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(student.status)}
            {getPaymentBadge(student.paymentStatus)}
          </div>
        </div>

        {!isTemp && student.status === "active" && (
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Course Progress</span>
                <span>
                  {student.weeksCompleted}/{student.weeksTotal} weeks
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Attendance</span>
                <span>
                  {student.daysAttended}/{student.totalDays} days
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    attendancePercentage >= 80
                      ? "bg-green-600"
                      : attendancePercentage >= 60
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                  style={{ width: `${attendancePercentage}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {student.startDate && student.endDate && (
          <div className="flex items-center text-sm text-slate-600 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {new Date(student.startDate).toLocaleDateString()} - {new Date(student.endDate).toLocaleDateString()}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            {student.notes && <p className="line-clamp-1">Notes: {student.notes}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(student)}>
              <Edit className="h-4 w-4 mr-1" />
              {readonly ? "View" : "Edit"}
            </Button>

            {student.status === "completed" && onGenerateCertificate && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGenerateCertificate(student)}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700"
              >
                <Award className="h-4 w-4 mr-1" />
                Certificate
              </Button>
            )}

            {!readonly && student.status === "active" && onExpel && (
              <Button variant="destructive" size="sm" onClick={() => onExpel(student)}>
                <UserX className="h-4 w-4 mr-1" />
                Expel
              </Button>
            )}

            {isTemp && onDelete && (
              <Button variant="destructive" size="sm" onClick={() => onDelete(student.id)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AddStudentDialog({
  open,
  onClose,
  onAdd,
  courses,
}: {
  open: boolean
  onClose: () => void
  onAdd: (student: any) => void
  courses: any[]
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    weeksTotal: 0,
    startDate: "",
    paymentStatus: "unpaid",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const endDate = new Date(formData.startDate)
    endDate.setDate(endDate.getDate() + formData.weeksTotal * 7)

    onAdd({
      ...formData,
      endDate: endDate.toISOString().split("T")[0],
    })

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      course: "",
      weeksTotal: 0,
      startDate: "",
      paymentStatus: "unpaid",
      notes: "",
    })
  }

  const selectedCourse = courses.find((c) => c.name === formData.course)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>Manually enroll a new student into a course</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="course">Course *</Label>
            <Select
              value={formData.course}
              onValueChange={(value) => {
                const course = courses.find((c) => c.name === value)
                setFormData((prev) => ({
                  ...prev,
                  course: value,
                  weeksTotal: course?.defaultWeeks || 0,
                }))
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.name}>
                    {course.name} ({course.defaultWeeks} weeks)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="weeksTotal">Course Duration (weeks) *</Label>
              <Input
                id="weeksTotal"
                type="number"
                min="1"
                max="52"
                value={formData.weeksTotal}
                onChange={(e) => setFormData((prev) => ({ ...prev, weeksTotal: Number.parseInt(e.target.value) || 0 }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentStatus: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes about the student..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Add Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ExpelStudentDialog({
  open,
  student,
  onClose,
  onExpel,
}: {
  open: boolean
  student: any
  onClose: () => void
  onExpel: (student: any, reason: string) => void
}) {
  const [reason, setReason] = useState("")

  const handleExpel = () => {
    if (reason.trim() && student) {
      onExpel(student, reason)
      setReason("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-800">Expel Student</DialogTitle>
          <DialogDescription>
            This action will remove {student?.firstName} {student?.lastName} from their current course. This cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason for Expulsion *</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide a detailed reason for expelling this student..."
              className="mt-1"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleExpel} disabled={!reason.trim()}>
              Expel Student
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StudentDetailsDialog({
  student,
  onClose,
  onUpdate,
}: {
  student: any
  onClose: () => void
  onUpdate: (student: any) => void
}) {
  const [editData, setEditData] = useState(student)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Student Details
            {!student.isTemp && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <div>
                    <Label>First Name</Label>
                    <Input
                      value={editData.firstName}
                      onChange={(e) => setEditData((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      value={editData.lastName}
                      onChange={(e) => setEditData((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={editData.email}
                      onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={editData.phone}
                      onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>Name:</strong> {student.firstName} {student.lastName}
                  </div>
                  <div>
                    <strong>Email:</strong> {student.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {student.phone}
                  </div>
                  <div>
                    <strong>Status:</strong> {getStatusBadge(student.status)}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Course Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Course Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <div>
                    <Label>Weeks Completed</Label>
                    <Input
                      type="number"
                      value={editData.weeksCompleted}
                      onChange={(e) =>
                        setEditData((prev) => ({ ...prev, weeksCompleted: Number.parseInt(e.target.value) || 0 }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Days Attended</Label>
                    <Input
                      type="number"
                      value={editData.daysAttended}
                      onChange={(e) =>
                        setEditData((prev) => ({ ...prev, daysAttended: Number.parseInt(e.target.value) || 0 }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Payment Status</Label>
                    <Select
                      value={editData.paymentStatus}
                      onValueChange={(value) => setEditData((prev) => ({ ...prev, paymentStatus: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>Course:</strong> {student.course}
                  </div>
                  <div>
                    <strong>Progress:</strong> {student.weeksCompleted}/{student.weeksTotal} weeks
                  </div>
                  <div>
                    <strong>Attendance:</strong> {student.daysAttended}/{student.totalDays} days
                  </div>
                  <div>
                    <strong>Payment:</strong> {getPaymentBadge(student.paymentStatus)}
                  </div>
                  {student.startDate && (
                    <div>
                      <strong>Start Date:</strong> {new Date(student.startDate).toLocaleDateString()}
                    </div>
                  )}
                  {student.endDate && (
                    <div>
                      <strong>End Date:</strong> {new Date(student.endDate).toLocaleDateString()}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-2">Notes</h3>
            {isEditing ? (
              <Textarea
                value={editData.notes}
                onChange={(e) => setEditData((prev) => ({ ...prev, notes: e.target.value }))}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-slate-700 bg-slate-50 p-3 rounded whitespace-pre-wrap">
                {student.notes || "No notes available"}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
