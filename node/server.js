// const redis = require('redis')
const { createClient } = require('redis')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Post = require('./schemas/Post')

const app = express()
mongoose.connect('mongodb://root:example@mongo:27017/')

let clientRedis
(async () => {
  clientRedis = createClient({ url: 'redis://redis:6379' })
  clientRedis.on("error", (error) => console.error(`Error : ${error}`))
  await clientRedis.connect()
})();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/list', async (req, res) => {
  try {
    const cached = await clientRedis.get('posts')
    if (cached) { return res.status(200).json({ ...JSON.parse(cached), cached: true }) }
    else {
      const posts = await Post.find({})
      await clientRedis.set('posts', JSON.stringify(posts))
      await clientRedis.expire('posts', 60)
      return res.status(200).json({ ...posts, cached: false })
    }
  } catch (err) { return res.status(500).json({ type: 'try', err: err }) }
})

app.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body)
    return res.status(201).json({ post })
  } catch (err) { return res.status(500).json({ err }) }
})

app.listen(4000, () => console.log('Running...'))