"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Clock, CheckCircle, Award } from "lucide-react"
import { useInternData } from "./hooks/useInternData"
import { AddInternModal } from "./components/AddInternModal"
import { AssignMentorModal } from "./components/AssignMentorModal"
import { StudentDetailsModal } from "./components/StudentDetailsModal"
import { IssueCertificateModal } from "./components/IssueCertificateModal"
import { OngoingInternsModal } from "./components/OngoingInternsModal"
import type { Intern } from "./types"

export default function HRDashboard() {
  const {
    interns,
    mentors,
    addIntern,
    assignMentor,
    issueCertificate,
    getUnassignedInterns,
    getOngoingInterns,
    getCompletedInterns,
  } = useInternData()

  // Modal states
  const [showAddIntern, setShowAddIntern] = useState(false)
  const [showAssignMentor, setShowAssignMentor] = useState(false)
  const [showStudentDetails, setShowStudentDetails] = useState(false)
  const [showIssueCertificate, setShowIssueCertificate] = useState(false)
  const [showOngoingInterns, setShowOngoingInterns] = useState(false)

  // Selected intern for modals
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null)

  // Current view
  const [currentView, setCurrentView] = useState<"dashboard" | "assign-mentor" | "completed">("dashboard")

  const unassignedInterns = getUnassignedInterns()
  const ongoingInterns = getOngoingInterns()
  const completedInterns = getCompletedInterns()

  const handleViewStudent = (intern: Intern) => {
    setSelectedIntern(intern)
    setShowStudentDetails(true)
  }

  const handleAssignMentor = (intern: Intern) => {
    setSelectedIntern(intern)
    setShowAssignMentor(true)
  }

  const handleIssueCertificate = (intern: Intern) => {
    setSelectedIntern(intern)
    setShowIssueCertificate(true)
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interns</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interns.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unassignedInterns.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ongoingInterns.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedInterns.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Interns</CardTitle>
        </CardHeader>
        <CardContent>
          {interns.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No interns added yet. Click "Add New Intern" to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interns.slice(-5).map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell>{intern.name}</TableCell>
                    <TableCell>{intern.email}</TableCell>
                    <TableCell>{intern.university}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          intern.status === "unassigned"
                            ? "bg-gray-100 text-gray-800"
                            : intern.status === "ongoing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {intern.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewStudent(intern)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderAssignMentor = () => (
    <Card>
      <CardHeader>
        <CardTitle>Assign Mentor - Student List</CardTitle>
      </CardHeader>
      <CardContent>
        {unassignedInterns.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No unassigned interns found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unassignedInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.name}</TableCell>
                  <TableCell>{intern.email}</TableCell>
                  <TableCell>{intern.university}</TableCell>
                  <TableCell>{intern.internshipDuration}</TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewStudent(intern)}>
                        View
                      </Button>
                      <Button size="sm" onClick={() => handleAssignMentor(intern)}>
                        Assign
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )

  const renderCompleted = () => (
    <Card>
      <CardHeader>
        <CardTitle>Completed Interns</CardTitle>
      </CardHeader>
      <CardContent>
        {completedInterns.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No completed interns found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Mentor</TableHead>
                <TableHead>Certificate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.name}</TableCell>
                  <TableCell>{intern.email}</TableCell>
                  <TableCell>{intern.university}</TableCell>
                  <TableCell>{intern.mentorName}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        intern.certificateIssued ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {intern.certificateIssued ? "Issued" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewStudent(intern)}>
                        View
                      </Button>
                      {!intern.certificateIssued && (
                        <Button size="sm" onClick={() => handleIssueCertificate(intern)}>
                          Issue Certificate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">HR Dashboard</h1>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setShowAddIntern(true)}
            className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            <UserPlus className="mr-3 h-4 w-4" />
            Add New Intern
          </button>
          <button
            onClick={() => setCurrentView("assign-mentor")}
            className={`w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 ${
              currentView === "assign-mentor" ? "bg-gray-100" : ""
            }`}
          >
            <Users className="mr-3 h-4 w-4" />
            Assign Mentor
          </button>
          <button
            onClick={() => setShowOngoingInterns(true)}
            className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            <Clock className="mr-3 h-4 w-4" />
            Ongoing
          </button>
          <button
            onClick={() => setCurrentView("completed")}
            className={`w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 ${
              currentView === "completed" ? "bg-gray-100" : ""
            }`}
          >
            <CheckCircle className="mr-3 h-4 w-4" />
            Completed
          </button>
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 ${
              currentView === "dashboard" ? "bg-gray-100" : ""
            }`}
          >
            <Award className="mr-3 h-4 w-4" />
            Dashboard
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {currentView === "dashboard" && renderDashboard()}
        {currentView === "assign-mentor" && renderAssignMentor()}
        {currentView === "completed" && renderCompleted()}
      </div>

      {/* Modals */}
      <AddInternModal isOpen={showAddIntern} onClose={() => setShowAddIntern(false)} onAdd={addIntern} />

      <AssignMentorModal
        isOpen={showAssignMentor}
        onClose={() => setShowAssignMentor(false)}
        intern={selectedIntern}
        mentors={mentors}
        onAssign={assignMentor}
      />

      <StudentDetailsModal
        isOpen={showStudentDetails}
        onClose={() => setShowStudentDetails(false)}
        intern={selectedIntern}
      />

      <IssueCertificateModal
        isOpen={showIssueCertificate}
        onClose={() => setShowIssueCertificate(false)}
        intern={selectedIntern}
        onIssue={issueCertificate}
      />

      <OngoingInternsModal
        isOpen={showOngoingInterns}
        onClose={() => setShowOngoingInterns(false)}
        ongoingInterns={ongoingInterns}
      />
    </div>
  )
}
