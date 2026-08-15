import type { SubjectGrade, Trimester } from '../types'

export type StudentGrades = Partial<Record<Trimester, SubjectGrade[]>>

const lucasFirstTrimester: SubjectGrade[] = [
  { id: 'math', name: 'Matemática', teacher: 'Profa. Ana Costa', assessments: [
    { id: 'math-1-p1', name: 'P1', grade: 8.5, date: '2026-03-20', type: 'regular' },
    { id: 'math-1-p2', name: 'P2', grade: 7.5, date: '2026-04-25', type: 'regular' },
    { id: 'math-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'portuguese', name: 'Português', teacher: 'Prof. Roberto Ferreira', assessments: [
    { id: 'port-1-p1', name: 'P1', grade: 9, date: '2026-03-18', type: 'regular' },
    { id: 'port-1-p2', name: 'P2', grade: 8, date: '2026-04-22', type: 'regular' },
    { id: 'port-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'science', name: 'Ciências', teacher: 'Profa. Lúcia Pires', assessments: [
    { id: 'sci-1-p1', name: 'P1', grade: 7, date: '2026-03-24', type: 'regular' },
    { id: 'sci-1-p2', name: 'P2', grade: 8.5, date: '2026-04-29', type: 'regular' },
    { id: 'sci-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'history', name: 'História', teacher: 'Prof. Marcos Andrade', assessments: [
    { id: 'hist-1-p1', name: 'P1', grade: 8, date: '2026-03-16', type: 'regular' },
    { id: 'hist-1-p2', name: 'P2', grade: 7, date: '2026-04-20', type: 'regular' },
    { id: 'hist-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'geography', name: 'Geografia', teacher: 'Prof. Eduardo Nunes', assessments: [
    { id: 'geo-1-p1', name: 'P1', grade: 8, date: '2026-03-19', type: 'regular' },
    { id: 'geo-1-p2', name: 'P2', grade: 9, date: '2026-04-24', type: 'regular' },
    { id: 'geo-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'english', name: 'Inglês', teacher: 'Profa. Camila Reis', assessments: [
    { id: 'eng-1-p1', name: 'P1', grade: 9.5, date: '2026-03-23', type: 'regular' },
    { id: 'eng-1-p2', name: 'P2', grade: 8.5, date: '2026-04-28', type: 'regular' },
    { id: 'eng-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
]

const lucasSecondTrimester: SubjectGrade[] = [
  { id: 'math', name: 'Matemática', teacher: 'Profa. Ana Costa', assessments: [
    { id: 'math-2-p1', name: 'P1', grade: 9, date: '2026-05-19', type: 'regular' },
    { id: 'math-2-p2', name: 'P2', grade: 8, date: '2026-06-26', type: 'regular' },
    { id: 'math-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'portuguese', name: 'Português', teacher: 'Prof. Roberto Ferreira', assessments: [
    { id: 'port-2-p1', name: 'P1', grade: 7.5, date: '2026-05-18', type: 'regular' },
    { id: 'port-2-p2', name: 'P2', grade: 9, date: '2026-06-23', type: 'regular' },
    { id: 'port-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'science', name: 'Ciências', teacher: 'Profa. Lúcia Pires', assessments: [
    { id: 'sci-2-p1', name: 'P1', grade: 8, date: '2026-05-22', type: 'regular' },
    { id: 'sci-2-p2', name: 'P2', grade: 9.5, date: '2026-06-29', type: 'regular' },
    { id: 'sci-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'history', name: 'História', teacher: 'Prof. Marcos Andrade', assessments: [
    { id: 'hist-2-p1', name: 'P1', grade: 7.5, date: '2026-05-20', type: 'regular' },
    { id: 'hist-2-p2', name: 'P2', grade: 8.5, date: '2026-06-25', type: 'regular' },
    { id: 'hist-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'geography', name: 'Geografia', teacher: 'Prof. Eduardo Nunes', assessments: [
    { id: 'geo-2-p1', name: 'P1', grade: 9, date: '2026-05-21', type: 'regular' },
    { id: 'geo-2-p2', name: 'P2', grade: 8, date: '2026-06-24', type: 'regular' },
    { id: 'geo-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'english', name: 'Inglês', teacher: 'Profa. Camila Reis', assessments: [
    { id: 'eng-2-p1', name: 'P1', grade: 8.5, date: '2026-05-23', type: 'regular' },
    { id: 'eng-2-p2', name: 'P2', grade: 9, date: '2026-06-30', type: 'regular' },
    { id: 'eng-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
]

const sofiaFirstTrimester: SubjectGrade[] = [
  { id: 'math', name: 'Matemática', teacher: 'Profa. Ana Costa', assessments: [
    { id: 'sof-math-1-p1', name: 'P1', grade: 9.5, date: '2026-03-20', type: 'regular' },
    { id: 'sof-math-1-p2', name: 'P2', grade: 9, date: '2026-04-25', type: 'regular' },
    { id: 'sof-math-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'portuguese', name: 'Português', teacher: 'Prof. Roberto Ferreira', assessments: [
    { id: 'sof-port-1-p1', name: 'P1', grade: 8.5, date: '2026-03-18', type: 'regular' },
    { id: 'sof-port-1-p2', name: 'P2', grade: 9.5, date: '2026-04-22', type: 'regular' },
    { id: 'sof-port-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'science', name: 'Ciências', teacher: 'Profa. Lúcia Pires', assessments: [
    { id: 'sof-sci-1-p1', name: 'P1', grade: 8, date: '2026-03-24', type: 'regular' },
    { id: 'sof-sci-1-p2', name: 'P2', grade: 8.5, date: '2026-04-29', type: 'regular' },
    { id: 'sof-sci-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'history', name: 'História', teacher: 'Prof. Marcos Andrade', assessments: [
    { id: 'sof-hist-1-p1', name: 'P1', grade: 9, date: '2026-03-16', type: 'regular' },
    { id: 'sof-hist-1-p2', name: 'P2', grade: 8, date: '2026-04-20', type: 'regular' },
    { id: 'sof-hist-1-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
]

const sofiaSecondTrimester: SubjectGrade[] = [
  { id: 'math', name: 'Matemática', teacher: 'Profa. Ana Costa', assessments: [
    { id: 'sof-math-2-p1', name: 'P1', grade: 8.5, date: '2026-05-19', type: 'regular' },
    { id: 'sof-math-2-p2', name: 'P2', grade: 9.5, date: '2026-06-26', type: 'regular' },
    { id: 'sof-math-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'portuguese', name: 'Português', teacher: 'Prof. Roberto Ferreira', assessments: [
    { id: 'sof-port-2-p1', name: 'P1', grade: 9, date: '2026-05-18', type: 'regular' },
    { id: 'sof-port-2-p2', name: 'P2', grade: 8, date: '2026-06-23', type: 'regular' },
    { id: 'sof-port-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'science', name: 'Ciências', teacher: 'Profa. Lúcia Pires', assessments: [
    { id: 'sof-sci-2-p1', name: 'P1', grade: 9.5, date: '2026-05-22', type: 'regular' },
    { id: 'sof-sci-2-p2', name: 'P2', grade: 9, date: '2026-06-29', type: 'regular' },
    { id: 'sof-sci-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
  { id: 'history', name: 'História', teacher: 'Prof. Marcos Andrade', assessments: [
    { id: 'sof-hist-2-p1', name: 'P1', grade: 7.5, date: '2026-05-20', type: 'regular' },
    { id: 'sof-hist-2-p2', name: 'P2', grade: 8.5, date: '2026-06-25', type: 'regular' },
    { id: 'sof-hist-2-rec', name: 'Recuperação', grade: null, date: null, type: 'recovery' },
  ] },
]

export const GRADES_BY_STUDENT: Record<string, StudentGrades> = {
  a1: { 1: lucasFirstTrimester, 2: lucasSecondTrimester },
  a2: { 1: sofiaFirstTrimester, 2: sofiaSecondTrimester },
}

export function calculateTrimesterAverage(assessments: SubjectGrade['assessments']): number | null {
  const regularGrades = assessments.filter(assessment => assessment.type === 'regular' && assessment.grade !== null).map(assessment => assessment.grade as number)
  if (regularGrades.length === 0) return null
  return regularGrades.reduce((sum, grade) => sum + grade, 0) / regularGrades.length
}
