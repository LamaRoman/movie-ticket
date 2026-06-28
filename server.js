import 'dotenv/config'

import app  from "./src/app.js";

const port = 5001;

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})