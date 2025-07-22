const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000; // You can choose a different port



// Enable CORS for local development (adjust as needed for production)
app.use(cors());



// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
