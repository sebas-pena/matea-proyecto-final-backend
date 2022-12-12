const fetch = require("node-fetch")
const FormData = require('form-data');
const fs = require("fs")
const uploadFile = async (file) => {
  console.log(`UPLOADED FILE: ${file.path}`)
  const form = new FormData()
  const image = fs.readFileSync(file.path)
  form.append("files[0]", image, {
    filename: file.fieldName + ".png",
    contentType: "application/octet-stream",
  })
  fs.unlink(file.path, () => { console.log(`DELETED FILE: ${file.path}`) })
  return (await fetch(`https://discord.com/api/v9/channels/${process.env.DISCORD_CHANNEL_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      ...form.getHeaders(),
    },
    body: form,
  })).json()
}

const handleSendFileToDiscord = (...files) => {
  return Promise.all(files.map(file => uploadFile(file)))
}
module.exports = handleSendFileToDiscord