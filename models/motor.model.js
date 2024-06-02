const mongoose = require('mongoose');

const motorSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "Please enter motor name"],
        }, 
        description : {
            type : String,
            required : [false],
        },
        location : {
            type : String,
            required : [true, "Please enter the location"],
        },
        Manufacturer : {
            type : String,
            required : [false],
        },
        modelNumber : {
            type : String,
            required : [true, "Please enter the Model Number"],
        },
        serialNumber : {
            type : String,
            required : [false],
        },
        installationDate : {
            type: Date, 
            required: [false],
        },
        lastMaintanaceDate : {
            type: Date, 
            required: [false],
        },
        status : {
            type : String,
            required : [true],
        },
        Specifications : {
            power : {
                type : String,
                required : [false]
            },
            voltage : {
                type : String,
                required : [false]
            },
            current : {
                type : String,
                required : [false]
            },
            speed : {
                type : String,
                required : [false]
            }
        }
    }
)

const Motor = mongoose.model("Motor", motorSchema);

module.exports = Motor;