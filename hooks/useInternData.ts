"use client"

import { useState } from "react"
import type { Intern, Mentor, Assignment, Certificate } from "../types"

// Dummy data for mentors
const DUMMY_MENTORS: Mentor[] = [
  { id: "1", name: "Dr. John Smith" },
  { id: "2", name: "Prof. Sarah Johnson" },
  { id: "3", name: "Dr. Michael Brown" },
  { id: "4", name: "Prof. Emily Davis" },
  { id: "5", name: "Dr. Robert Wilson" },
]

export function useInternData() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])

  // TODO: Replace with API calls
  const addIntern = (internData: Omit<Intern, "id" | "status">) => {
    const newIntern: Intern = {
      ...internData,
      id: Date.now().toString(),
      status: "unassigned",
    }
    setInterns((prev) => [...prev, newIntern])
    // TODO: API call - POST /api/interns
  }

  const assignMentor = (assignment: Assignment) => {
    setAssignments((prev) => [...prev, assignment])
    setInterns((prev) =>
      prev.map((intern) =>
        intern.id === assignment.studentId
          ? { ...intern, status: "ongoing", mentorId: assignment.mentorId, mentorName: assignment.mentorName }
          : intern,
      ),
    )
    // TODO: API call - POST /api/assignments
  }

  const issueCertificate = (certificate: Certificate) => {
    setCertificates((prev) => [...prev, certificate])
    setInterns((prev) =>
      prev.map((intern) =>
        intern.id === certificate.studentId ? { ...intern, status: "completed", certificateIssued: true } : intern,
      ),
    )
    // TODO: API call - POST /api/certificates
  }

  const getUnassignedInterns = () => interns.filter((intern) => intern.status === "unassigned")
  const getOngoingInterns = () => interns.filter((intern) => intern.status === "ongoing")
  const getCompletedInterns = () => interns.filter((intern) => intern.status === "completed")

  return {
    interns,
    assignments,
    certificates,
    mentors: DUMMY_MENTORS,
    addIntern,
    assignMentor,
    issueCertificate,
    getUnassignedInterns,
    getOngoingInterns,
    getCompletedInterns,
  }
}
