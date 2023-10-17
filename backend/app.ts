import express from "express"
import { Request, Response } from "express"
import Form from "./formModel/FormClass"
import db from "./db/database"




const app = express()
const port:number = 8080


// cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers','x-refresh-token,Origin, X-Requested-With, Content-Type, Accept, Authorization, _id');
    
    res.header('Access-Control-Expose-Headers',
    'authorization, x-refresh-token,');
    
    next();
});

// body parse request middleware 
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/api/forms', async (req: Request, res: Response) => {
  try {
    const sql = `SELECT * FROM FormData`

  db.all(sql, [], (err:any, rows:FormData[]) => {
    if(err) {
      console.log(err.message);
      return res.status(500).json({error:"Am error occured while fecthing data from database"})
    }

    rows.forEach(element => {
      console.log(element);
      
    });
    res.status(200).json(rows)
    
  })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
  
});

app.post('/api/forms', async (req: Request, res: Response) => {
  
  try {

    const formData = new Form(
      req.body.firstName,
      req.body.lastName,
      req.body.address,
      req.body.phone,
      req.body.email,
      req.body.checkbox,
    );
  
    
    const validationError = formData.validate();
    
    if (validationError) {
      console.log(validationError);
      return res.status(400).json({ message:`Validation error: ${validationError}`, validationError});
     
      
    }
    

    
    const sql = db.prepare(
      'INSERT INTO FormData (firstName, lastName, address, phone, email, checkbox) VALUES (?, ?, ?, ?, ?, ?)',
    );

    await sql.run(
      formData.firstName,
      formData.lastName,
      formData.address,
      formData.phone,
      formData.email,
      formData.checkbox ? 1 : 0,
    );
    res.status(200).json({ message: 'Form data inserted successfully', formData});
    console.log(formData, validationError);
    

  } catch (error) {
    
    return res.status(500).json({error:"Server error"});
  }

  
});




app.listen(port, () => {
  console.log(`The app is listening on ${port}`);
  
})