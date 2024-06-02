const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema(
    {
        Ticket_ID : {
            type : String,
            required : [false]
        },
        Asset_ID : {
            type : String,
            required : [false]
        },
        Issue_Description : {
            type : String,
            required : [false]
        },
        Date_Raised : {
            type: Date, 
            required: [false],
        },
        Status : {
            type : String,
            required : [false]
        }
    }
)

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;