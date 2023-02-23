

import createServer from "./server.js";

const server  = await createServer()

const port = 5500
server.listen(port, ()=>{
    console.log(`server running on port${port}`)
})