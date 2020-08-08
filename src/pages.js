const Database = require ('./database/db.js')
const {subjects,  weekdays,  getSubject,  convertHourstoMinutes} = require('./utils/format.js')

function pageLanding(req, res) {
  return res.render("index.html")
}
async function pageStudy (req, res) {
    const filters = req.query
    if (!filters.subject || !filters.weekday || !filters.time) {
      return res.render("study.html", { filters, subjects, weekdays })
    }
    const timeToMinutes = convertHourstoMinutes(filters.time)
    const query = `
    SELECT Classes.*, Proffys.*
    FROM Proffys
    JOIN Classes ON (Proffys.id = Classes.proffy_id)
    WHERE EXISTS(
      SELECT Class_schedule.*
      FROM Class_schedule
      WHERE Class_schedule.class_id = Classes.id
      AND Class_schedule.weekday =  ${filters.weekday}
      AND Class_schedule.time_from <= ${timeToMinutes}
      AND Class_schedule.time_to > ${timeToMinutes}
    ) AND Classes.subject = ${filters.subject};
    `
    try {
      const db = await Database
      const proffys = await db.all(query)

      proffys.map((proffy) => {
        proffy.subject = getSubject(proffy.subject)
      })

      return res.render("study.html", {proffys, filters, subjects, weekdays})
    } catch(error) {
      console.log(error)
    }

}

function pageGiveClasses (req, res) {
    return res.render("give-classes.html", {weekdays, subjects})
}

async function saveClasses(req, res) {
  const createProffy = require('./database/createProffy.js')
  const proffyValue = {
    name : req.body.name,
    avatar : req.body.avatar,
    whatsapp : req.body.whatsapp,
    bio : req.body.bio
  }
  const classValue = {
    subject : req.body.subject,
    cost : req.body.cost
  }
  const classScheduleValues = req.body.weekday.map( (weekday, index) => {
    return {
      weekday,
      time_from : convertHourstoMinutes(req.body.time_from[index]),
      time_to  : convertHourstoMinutes(req.body.time_to[index])
    }
  }
)
  try {
    const db = await Database
    await createProffy(db, {proffyValue, classValue, classScheduleValues})
    time = req.body.time_from[0]
    const [hour, minutes] = time.split(":")
    const timeUrl = hour + "%3A" + minutes
    let queryString = "?subject=" + req.body.subject
    queryString += "&weekday=" + req.body.weekday[0]
    queryString += "&time=" + timeUrl

    return res.redirect("/study" + queryString)
  } catch(error) {
    console.log(error)
  }
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses
}
