const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the property name.'],
        trim: true,
        maxLength: [100, 'Property name can not exceed 100 characters.']
    },
    address: {
        type: String,
        required: [true, 'Please enter the property address.'],
        trim: true,
        maxLength: [46, 'Property address can not exceed 46 characters.']
    },
    type: {
        type: String,
        required: [true, 'Please select the property type.'],
        enum: {
            values: [
                'Apartment',
                'House',
                'Cabin',
                'Private Rooms',
                'Flat',
                'HouseBaots',
                'Treehouses',
                'Castles',
                'Domes'
            ],
            message: 'Please select the property type'
        }
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Property description can not exceed 500 characters.']
    },
    image_url: {
        type: String
    },
    total_rooms: {
        type: Number,
        default: 1
    },
    occupancy_type: {
        type: String,
        required: [true, 'Please select the property occupancy type.'],
        enum: {
            values: [
                'Assembly (A)',
                'Business (B)',
                'Educational (E)',
                'Educational (E)',
                'High Hazard (H)',
                'Institutional (I)',
                'Mercantile (M)',
                'Residential (R)',
                'Storage (S)',
                'Utility and Miscellaneous (U)'
            ],
            message: 'Please select the property occupancy type'
        }
    },
    rent_amount: {
        type: Number,
        required: [true, 'Please enter rent amount.']
    },
    rent_frequency: {
        type: String,
        required: [true, 'Please enter rent frequency.'],
        enum: {
            values: [
                'Weekly',
                'Bi-Weekly',
                'Monthly',
                'Quarterly',
                'Semi-Annualy',
                'Annualy'
            ],
            message: 'Select the rent frequency'
        }
    },
    is_approved: {
        type: Boolean
    },
    is_published: {
        type: Boolean,
        default: false,
    }
});

propertySchema.pre('save', function (next) {
    this.is_approved = false;
    next();
});

module.exports = mongoose.model('Property', propertySchema);