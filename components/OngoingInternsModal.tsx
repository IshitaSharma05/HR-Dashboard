"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Intern } from "../types"

interface OngoingInternsModalProps {
  isOpen: boolean
  onClose: () => void
  ongoingInterns: Intern[]
}

export function OngoingInternsModal({ isOpen, onClose, ongoingInterns }: OngoingInternsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ongoing Interns</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {ongoingInterns.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No ongoing interns found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ongoingInterns.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell>{intern.name}</TableCell>
                    <TableCell>{intern.email}</TableCell>
                    <TableCell>{intern.university}</TableCell>
                    <TableCell>{intern.internshipDuration}</TableCell>
                    <TableCell>{intern.mentorName || "Not assigned"}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Ongoing</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
