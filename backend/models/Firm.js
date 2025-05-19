const mongoose = require('mongoose')

const FirmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        require: true,
        unique: true,
    },
    area: {
        type: String,
        require: true,
    },
    category: {
        type: [
            {
            type: String,
            enum: ['veg', 'non-veg']
            }
        ]
    },
    region: {
        type: [
            {
                type: String,
                enum: ['south-indian', 'north-indian', 'chinese', 'bakery']
            }
        ]
    },
    offer: {
        type: String
    },
    image: {
        tpe: String
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vendor'
        }
    ]
});

const Firm = mongoose.model('Firm', FirmSchema);
module.exports = Firm;
