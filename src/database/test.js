const Database = require ('./db.js')
const createProffy = require('./createProffy.js')

Database.then(async (db) => {
  proffyValue =  {
    name : "Gabriel Reinert",
    avatar :"https://avatars1.githubusercontent.com/u/58665277?s=460&u=e3fa3a54f42165edc41a16c3e45ec14b222709f2&v=4",
    whatsapp : "12345678912",
    bio : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
  classValue = {
    subject : "1",
    cost: "20",
  }

  classScheculeValues = [
    {
    weekday: 0,
    time_from: 720 ,
    time_to: 1220,
    },
    {
      weekday: 2,
      time_from: 1720 ,
      time_to: 1820,
    }
  ]
  await createProffy(db, {proffyValue, classValue, classScheculeValues})
  const selectedProffys = await db.all("SELECT * from Proffys")
  const selectClassesAndProffys = await db.all(`
    SELECT Classes.*, Proffys.*
    FROM Proffys
    JOIN Classes ON (Proffys.id = Classes.proffy_id)
    WHERE Classes.proffy_id = 1;
    `)
    const selectClassesSchedules = await db.all(`
      SELECT Class_schedule.*
      FROM Class_schedule
      WHERE Class_schedule.class_id = Class.id
      AND Class_schedule.weekday =  "0"
      AND Class_schedule.time_from <= "520"
      AND Class_schedule.time_to > "520 "
      `)
})
