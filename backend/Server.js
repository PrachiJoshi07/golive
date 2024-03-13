const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 5000;




// MongoDB connection URL
const mongoURI = 'yourdb link';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));





// Define a schema for your events
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  dateTime: Date,
  category: String
});

// Create a model based on the schema
const Event = mongoose.model('Event', eventSchema);

// Parse JSON bodies in POST requests
app.use(express.json());

// POST endpoint to handle form submissions
app.post('/api/events', async (req, res) => {
  console.log('Received event data:', req.body);
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    dateTime: req.body.dateTime,
    category: req.body.category
  });
  console.log('Event to be saved:', event);
  try {
    const savedEvent = await event.save();
    res.status(201).send(savedEvent); // 201 status code for resource created
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).send(err); // 400 status code for bad request
  }
});

// Define a GET endpoint to fetch events from the database
app.get('/api/events', async (req, res) => {
    try {
      // Fetch events from the database
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// // Define CORS options
// const corsOptions = {
//     origin: 'http://localhost:3000 ', // Replace with your frontend domain
//     methods: 'GET,POST', // Add other allowed methods as needed
//   };
// 

  app.use(cors({ origin: 'http://localhost:3000' }));


  // Use CORS middleware
  // 
module.exports = app;
