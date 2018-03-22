// @flow
import express from 'express'
import type { $Request, $Response } from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')))

app.get('*', (req: $Request, res: $Response) => res.sendFile(
  path.join(__dirname, '..', '..', 'client', 'build', 'index.html')))

const port = process.env.PORT || 5000
app.listen(port)

console.log(`App listening on ${port}`)
