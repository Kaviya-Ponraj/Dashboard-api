const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Motor = require('./models/motor.model.js')

const Ticket = require("./models/Ticket.model.js")


const app = express();
app.use(cors({
    origin : ["https://dashboard-one-rho-59.vercel.app/"],
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}));
// app.use(express.json())
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001 , () => {
         console.log("Server started in port 3001");
 });

 // Middleware to validate date
function validateDate(req, res, next) {
    const { date } = req.body;
    if (date && !Date.parse(date)) {
        return res.status(400).json({ message: "Invalid date format. Date should be in ISO format." });
    }
    next();
}

//  get request in browser (api)

app.get("/", async (req, res) => {
    res.send("Hello from the node js server ")
})

// to get the api
app.get("/motors", async (req, res) => {
    try {
        const motor = await Motor.find({}) // fetch data from mongodb
        res.status(200).json(motor); // send fetched data as JSON response
    } catch (error) {
        res.status(500).json({message : error.message}); // handle errors
    }
})

// to get the data from one id
app.get("/motors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const motor = await Motor.findById(id);
        if (!motor) {
            // If product with the given ID is not found, return a 404 status
            return res.status(404).json({ message: "Motor not found" });
        }
        res.status(200).json(motor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update a data
app.put("/motors/:id" , async (req, res) => {
    try {
        const { id } = req.params;
        const updateMotorData = req.body;
        const UpdateMotor = await Motor.findByIdAndUpdate(id, updateMotorData, {new : true});
        if(!UpdateMotor) {
            return res.status(404).json({message : "Motor not found"});
        }

        res.status(200).json(UpdateMotor);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});

// deleting a data
app.delete("/motors/:id" , async (req, res) => {
    try {
        const { id } = req.params;
        
        const motor = await Motor.findByIdAndDelete(id)

        if(!motor) {
            res.status(404).json({message : "Motor not found"});
        }
        
        res.status(200).json({message : "Motor deleted successfully"});

    } catch (error) {
        res.status(500).json({message : error.message})
    }
});


// creating a new data
app.post("/motors" , validateDate, async (req,res) => {
    // console.log(req.body);
    // res.send(req.body)

    try {
        const motor = await Motor.create(req.body) 
        res.status(200).json(motor);
    } catch (error) {
       res.status(500).json({message : error.message}) 
    }
})

// app.get("/", async (req, res) => {
//     try {
//         const motor = await Motor.find({}); // Fetch data from MongoDB
//         res.status(200).json(motor); // Send the fetched data as JSON response
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // Handle errors
//     }
// });

// Tickets api starts here

// to get the api
app.get("/tickets", async (req, res) => {
    try {
        const ticket = await Ticket.find({}) // fetch data from mongodb
        res.status(200).json(ticket); // send fetched data as JSON response
    } catch (error) {
        res.status(500).json({message : error.message}); // handle errors
    }
})

// to get the data from one id
app.get("/tickets/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            // If product with the given ID is not found, return a 404 status
            return res.status(404).json({ message: "ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update a data
app.put("/tickets/:id" , async (req, res) => {
    try {
        const { id } = req.params;
        const updateTicketData = req.body;
        const UpdateTicket = await Motor.findByIdAndUpdate(id, updateTicketData, {new : true});
        if(!UpdateTicket) {
            return res.status(404).json({message : "Ticket not found"});
        }

        res.status(200).json(UpdateTicket);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});


// deleting a data
app.delete("/motors/:id" , async (req, res) => {
    try {
        const { id } = req.params;
        
        const ticket = await Ticket.findByIdAndDelete(id)

        if(!ticket) {
            res.status(404).json({message : "Ticket not found"});
        }
        
        res.status(200).json({message : "Ticket deleted successfully"});

    } catch (error) {
        res.status(500).json({message : error.message})
    }
});

// creating a new data
app.post("/tickets" , validateDate, async (req,res) => {
    // console.log(req.body);
    // res.send(req.body)

    try {
        const ticket = await Ticket.create(req.body) 
        res.status(200).json(ticket);
    } catch (error) {
       res.status(500).json({message : error.message}) 
    }
})


// connect mongoDb

 mongoose.connect('mongodb+srv://kaviyaponraj01:KAEVD1zDlk3HwPQv@motor.d6kvtcb.mongodb.net/?retryWrites=true&w=majority&appName=motor')
 .then(() => {
     console.log("connected to mongoDB")
    
 })
 .catch(() => {
     console.log("Connection failed");
 })
