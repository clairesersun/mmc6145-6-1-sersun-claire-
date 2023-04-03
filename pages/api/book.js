import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

// this handler runs for /api/book with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  async function handler(req, res) {
    const user = req.session.user
    switch(req.method) {
      // TODO: On a POST request, add a book using db.book.add with request body (must use JSON.parse)
      case 'POST' :
        if (!user) {
          return res.status(401).end() }
          try {
            const data = JSON.parse(req.body) //data is an object {title, id, ect}
            const addedBook = await db.book.add(user.id, data.book) 
            //add function returns null if user is not found or book not added
            if (!addedBook) {
              //if adding book fails, log user out/delete cookie
              req.session.destroy()
              return res.status(401).end
            }
            return res.status(200).json(addedBook)
          } catch (err) {
            return res.status(400).json({error: err.message})
          }
        // } else {
        //   const add = await JSON.parse(db.book.add(req.body.task))
        //   return res.status(200).json(add)}
          // TODO: On a DELETE request, remove a book using db.book.remove with request body (must use JSON.parse)
      case 'DELETE' :
        if (!user) {
          return res.status(401).end()}
          try {
            const data = JSON.parse(req.body)
            const deletedBook = await db.book.remove(data.book) 
            if (!deletedBook) {
              req.session.destroy()
              return res.status(401).end()
            }
            return res.status(200).json(deletedBook)
          } catch (err) {
            return res.status(400).json({error: err.message})
          }
        // } else {
        // const remove = await JSON.parse(db.book.remove(req.body.task))
        // return res.status(200).json(remove)}
      // TODO: Respond with 404 for all other requests
      default:
        return res.status(404).end()
        // User info can be accessed with req.session
        // No user info on the session means the user is not logged in
      }
      
      
    },
    sessionOptions
)