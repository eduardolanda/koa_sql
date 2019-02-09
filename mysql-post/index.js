const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const pool = require('./DB/dbconfig')

const app = new Koa()
app.use(bodyParser())
app.use(cors())

app.use(async ctx => {
  const data = await ctx.request.body.title
  const item = await getName(data)
  ctx.body = item;
})

async function getName(title) {
  try {
    const itemData = await pool.query(`SELECT * from movieList WHERE movieTitle LIKE "${title}"`)
    return itemData
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()
