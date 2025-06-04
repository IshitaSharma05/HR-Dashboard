"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Intern, Certificate } from "../types"

interface IssueCertificateModalProps {
  isOpen: boolean
  onClose: () => void
  intern: Intern | null
  onIssue: (certificate: Certificate) => void
}

export function IssueCertificateModal({ isOpen, onClose, intern, onIssue }: IssueCertificateModalProps) {
  const [formData, setFormData] = useState({
    college: "",
    duration: "",
    mentorRemarks:
      "Excellent performance throughout the internship period. Demonstrated strong technical skills and professional attitude.",
    attendance: "95%",
    hrFinalRemarks: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!intern) return

    onIssue({
      studentId: intern.id,
      studentName: intern.name,
      college: formData.college,
      duration: formData.duration,
      mentorRemarks: formData.mentorRemarks,
      attendance: formData.attendance,
      hrFinalRemarks: formData.hrFinalRemarks,
      issuedDate: new Date().toISOString().split("T")[0],
    })

    setFormData({
      college: "",
      duration: "",
      mentorRemarks:
        "Excellent performance throughout the internship period. Demonstrated strong technical skills and professional attitude.",
      attendance: "95%",
      hrFinalRemarks: "",
    })
    onClose()
  }

  const handleCancel = () => {
    setFormData({
      college: "",
      duration: "",
      mentorRemarks:
        "Excellent performance throughout the internship period. Demonstrated strong technical skills and professional attitude.",
      attendance: "95%",
      hrFinalRemarks: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Issue Certificate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="studentName">Student Name</Label>
            <Input id="studentName" value={intern?.name || ""} disabled />
          </div>

          <div>
            <Label htmlFor="college">College</Label>
            <Input
              id="college"
              value={formData.college}
              onChange={(e) => setFormData((prev) => ({ ...prev, college: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
              placeholder="e.g., 3 months"
              required
            />
          </div>

          <div>
            <Label htmlFor="mentorRemarks">Mentor Remarks</Label>
            <Textarea
              id="mentorRemarks"
              value={formData.mentorRemarks}
              onChange={(e) => setFormData((prev) => ({ ...prev, mentorRemarks: e.target.value }))}
              rows={3}
              disabled
            />
          </div>

          <div>
            <Label htmlFor="attendance">Attendance</Label>
            <Input
              id="attendance"
              value={formData.attendance}
              onChange={(e) => setFormData((prev) => ({ ...prev, attendance: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="hrRemarks">HR Final Remarks *</Label>
            <Textarea
              id="hrRemarks"
              value={formData.hrFinalRemarks}
              onChange={(e) => setFormData((prev) => ({ ...prev, hrFinalRemarks: e.target.value }))}
              placeholder="Enter HR final remarks..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Issue</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
