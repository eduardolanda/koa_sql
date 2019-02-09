const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('./db/db')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  // const dbtitle = await ctx.request.body.title
  const item = await show(1)
  const item1 = await show(2)

  ctx.body = [item, item1];
})

async function show(id) {
  try {
    const itemData = await pool.query(`SELECT movieTitle FROM movieList WHERE movieID = ${id}`)
    return itemData[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()
