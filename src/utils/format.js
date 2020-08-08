const subjects = [
  "Artes",   "Biologia" ,  "Ciências",  "Educação Física",  "Física",
  "Geografia",  "História",  "Matematica",  "Português",  "Química",
]
const weekdays = [
  "Domingo",  "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira",
  "Sexta-feira", "Sábado",
]

function getSubject(subjectNumber) {
  const arrayPosition = +subjectNumber - 1
  return subjects[arrayPosition]
}

function convertHourstoMinutes(time)  {
  const [hour, minutes] = time.split(":")
  return Number((+hour * 60) + +minutes)
}

module.exports = {
  subjects,
  weekdays,
  getSubject,
  convertHourstoMinutes
}
