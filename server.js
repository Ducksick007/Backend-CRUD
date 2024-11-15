const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;


app.use(express.json());
app.use(cors());  


app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

});  