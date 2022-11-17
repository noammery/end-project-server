// const { SENDGRID_API_KEY } = require("./config");
require('dotenv').config()

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: ['oleg.bragin.01@gmail.com','baxi585@gmail.com'], // Change to your recipient
  from: 'dimonaWorkersSite@gmail.com', // Change to your verified sender
  templateId: 'd-9d56dbe7304040858371bb8495de7705',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })