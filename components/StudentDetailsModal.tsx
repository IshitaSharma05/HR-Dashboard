"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Intern } from "../types"

interface StudentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  intern: Intern | null
}

export function StudentDetailsModal({ isOpen, onClose, intern }: StudentDetailsModalProps) {
  if (!intern) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Name:</strong> {intern.name}
            </div>
            <div>
              <strong>Age:</strong> {intern.age}
            </div>
          </div>

          <div>
            <strong>Address:</strong> {intern.address}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Mobile:</strong> {intern.mobile}
            </div>
            <div>
              <strong>Email:</strong> {intern.email}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Educational Qualification:</strong> {intern.educationalQualification}
            </div>
            <div>
              <strong>University:</strong> {intern.university}
            </div>
          </div>

          <div>
            <strong>Semester-wise Grades:</strong> {intern.semesterGrades}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Internship Duration:</strong> {intern.internshipDuration}
            </div>
            <div>
              <strong>Family in Foreign Orgs:</strong> {intern.familyInForeignOrgs}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Worked in DRDO:</strong> {intern.workedInDRDO ? "Yes" : "No"}
            </div>
            <div>
              <strong>Aadhar Number:</strong> {intern.aadharNumber}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Date:</strong> {intern.date}
            </div>
            <div>
              <strong>Status:</strong> {intern.status}
            </div>
          </div>

          {intern.mentorName && (
            <div>
              <strong>Assigned Mentor:</strong> {intern.mentorName}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
