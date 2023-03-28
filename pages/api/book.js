import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

// this handler runs for /api/book with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  async function handler(req, res) {
    const user = req.session.user
    if (!user) {
      res.status(401).json({error:error.message}).clear().end()
    } else {
    switch(req.method) {

      // TODO: On a POST request, add a book using db.book.add with request body (must use JSON.parse)
      case 'POST' :
          const add = await JSON.parse(db.book.add(req.body.task))
          return res.status(200).json(add)
          // TODO: On a DELETE request, remove a book using db.book.remove with request body (must use JSON.parse)
      case 'DELETE' :
        const remove = await JSON.parse(db.book.remove(req.body.task))
        return res.status(200).json(remove)
      // TODO: Respond with 404 for all other requests
      default:
        return res.status(404).end()
        // User info can be accessed with req.session
        // No user info on the session means the user is not logged in
      }
      }
      
    },
    sessionOptions
)