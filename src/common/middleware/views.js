import middler from 'middler'
import views from 'views'
import http from 'http'
import path from 'path'
import { userModel } from '../../database/model/user.model.js'

let count_views = 0

const server = http.createServer()

const registry = views.createRegistry(
  path.resolve('src/common/middleware')
)

export const countViews = (req, res, next) => {

  count_views++

  req.count_views = count_views   

  next()  
}

middler(server)
  .add(views.middleware(registry))
  .add(countViews)