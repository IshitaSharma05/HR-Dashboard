"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Intern } from "../types"

interface AddInternModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (internData: Omit<Intern, "id" | "status">) => void
}

export function AddInternModal({ isOpen, onClose, onAdd }: AddInternModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    mobile: "",
    email: "",
    educationalQualification: "",
    university: "",
    semesterGrades: "",
    internshipDuration: "",
    familyInForeignOrgs: "",
    workedInDRDO: false,
    aadharNumber: "",
    date: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      ...formData,
      age: Number.parseInt(formData.age),
    })
    setFormData({
      name: "",
      age: "",
      address: "",
      mobile: "",
      email: "",
      educationalQualification: "",
      university: "",
      semesterGrades: "",
      internshipDuration: "",
      familyInForeignOrgs: "",
      workedInDRDO: false,
      aadharNumber: "",
      date: "",
    })
    onClose()
  }

  const handleCancel = () => {
    setFormData({
      name: "",
      age: "",
      address: "",
      mobile: "",
      email: "",
      educationalQualification: "",
      university: "",
      semesterGrades: "",
      internshipDuration: "",
      familyInForeignOrgs: "",
      workedInDRDO: false,
      aadharNumber: "",
      date: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Intern</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email ID</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="qualification">Educational Qualification</Label>
              <Input
                id="qualification"
                value={formData.educationalQualification}
                onChange={(e) => setFormData((prev) => ({ ...prev, educationalQualification: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                value={formData.university}
                onChange={(e) => setFormData((prev) => ({ ...prev, university: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="grades">Semester-wise Grades</Label>
            <Textarea
              id="grades"
              value={formData.semesterGrades}
              onChange={(e) => setFormData((prev) => ({ ...prev, semesterGrades: e.target.value }))}
              placeholder="Enter semester-wise grades"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Internship Duration</Label>
              <Input
                id="duration"
                value={formData.internshipDuration}
                onChange={(e) => setFormData((prev) => ({ ...prev, internshipDuration: e.target.value }))}
                placeholder="e.g., 3 months"
                required
              />
            </div>
            <div>
              <Label htmlFor="family">Family members in foreign organizations/embassies</Label>
              <Input
                id="family"
                value={formData.familyInForeignOrgs}
                onChange={(e) => setFormData((prev) => ({ ...prev, familyInForeignOrgs: e.target.value }))}
                placeholder="None or specify"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="drdo">Worked in DRDO</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, workedInDRDO: value === "yes" }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="aadhar">Aadhar Number</Label>
              <Input
                id="aadhar"
                value={formData.aadharNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, aadharNumber: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
