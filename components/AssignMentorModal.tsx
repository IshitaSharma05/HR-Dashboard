"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Intern, Mentor, Assignment } from "../types"

interface AssignMentorModalProps {
  isOpen: boolean
  onClose: () => void
  intern: Intern | null
  mentors: Mentor[]
  onAssign: (assignment: Assignment) => void
}

export function AssignMentorModal({ isOpen, onClose, intern, mentors, onAssign }: AssignMentorModalProps) {
  const [formData, setFormData] = useState({
    college: "",
    duration: "",
    branch: "",
    mentorId: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!intern) return

    const selectedMentor = mentors.find((m) => m.id === formData.mentorId)
    if (!selectedMentor) return

    onAssign({
      studentId: intern.id,
      studentName: intern.name,
      college: formData.college,
      duration: formData.duration,
      branch: formData.branch,
      mentorId: formData.mentorId,
      mentorName: selectedMentor.name,
    })

    setFormData({ college: "", duration: "", branch: "", mentorId: "" })
    onClose()
  }

  const handleCancel = () => {
    setFormData({ college: "", duration: "", branch: "", mentorId: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Mentor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" value={intern?.id || ""} disabled />
          </div>

          <div>
            <Label htmlFor="studentName">Name</Label>
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
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              value={formData.branch}
              onChange={(e) => setFormData((prev) => ({ ...prev, branch: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="mentor">Mentor</Label>
            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, mentorId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a mentor" />
              </SelectTrigger>
              <SelectContent>
                {mentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Assign</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
