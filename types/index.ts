export interface Intern {
  id: string
  name: string
  age: number
  address: string
  mobile: string
  email: string
  educationalQualification: string
  university: string
  semesterGrades: string
  internshipDuration: string
  familyInForeignOrgs: string
  workedInDRDO: boolean
  aadharNumber: string
  date: string
  status: "unassigned" | "ongoing" | "completed"
  mentorId?: string
  mentorName?: string
  certificateIssued?: boolean
}

export interface Mentor {
  id: string
  name: string
}

export interface Assignment {
  studentId: string
  studentName: string
  college: string
  duration: string
  branch: string
  mentorId: string
  mentorName: string
}

export interface Certificate {
  studentId: string
  studentName: string
  college: string
  duration: string
  mentorRemarks: string
  attendance: string
  hrFinalRemarks: string
  issuedDate: string
}
