const Property = require('../models/properties');

// Create new property => /properties/new
exports.newProperty = async (req, res, next) => {

    const property = await Property.create(req.body);

    res.status(200).json({
        success: true,
        message: 'Property Created',
        data: property
    });

}

// Update a property => /properties/:id
exports.updateProperty = async (req, res, next) => {
    const propertyId = req.params.id;
    let property = await Property.findById(propertyId);

    if (!property) {
        res.status(404).json({
            success: false,
            message: 'Property not found.'
        });
    }

    // Update the property if found
    property = await Property.findByIdAndUpdate(propertyId, req.body, {
        new: true
    });

    res.status(200).json({
        success: true,
        message: 'Property is updated,',
        data: property
    });
}

// Delete a property => /properties/:id

// Publish a property => /properties/publish/:id

// Get property by address => /properties/:address