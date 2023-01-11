// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import fs from 'fs'
import path from 'path'

function getPath() {
  return path.join(process.cwd(), "data", "feedback.json")
}

function handler(req, res) {
  if (req.method === "GET") {
    const fileData = fs.readFileSync(getPath());
    const data = JSON.parse(fileData)
    res.status(201).json({ Feedbacks: data })
  } else if (req.method === "POST") {
    const { email, feedBack } = req.body

    const feedBackNew = {
      id: new Date().toISOString(),
      email: email,
      feedBack: feedBack
    }
    const absPath = getPath()
    const fileData = fs.readFileSync(absPath)
    const data = JSON.parse(fileData)
    data.push(feedBackNew);
    fs.writeFileSync(absPath, JSON.stringify(data))
    res.status(200).json({ mesasge: "Success", feedBack: feedBackNew })

  }
  else {
    res.status(201).json({ Feedbacks: "Invalid" })
  }
}

export default handler
