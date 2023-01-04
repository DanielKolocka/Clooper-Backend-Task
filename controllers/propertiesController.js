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