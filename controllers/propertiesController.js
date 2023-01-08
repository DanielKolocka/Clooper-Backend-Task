const Property = require('../models/properties');
const User = require('../models/users');
const sendEmail = require('../sendEmail');

// Create new property => /properties/new/:id
exports.newProperty = async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (user) {
        if (user.is_active) {
            const property = await Property.create(req.body);

            res.status(200).json({
                success: true,
                message: 'Property Created. Email put in queue.',
                data: property
            });

            const message = `The following property has been created:\n\n${property.name}\n${property.address}\n\nProperty created by user: ${user.first_name} ${user.last_name}`;
            const delay = 20*60*1000;
            setTimeout(async function() {
                try {
                    await sendEmail({
                        email: 'metrics@clooper.com',
                        subject: 'Clooper Property Created-Requires Approval',
                        message
                    });
                } catch (error) {
                    console.log('Email has not been sent.');
                    return;
                }
            }, delay
            ); 
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: 'User either does not exist or is not approved to create a property.'
        });
        return;
    }
    

}

// Update a property => /properties/:propertyId/:id
exports.updateProperty = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    const propertyId = req.params.propertyId;

    if (user) {
        if (user.is_active) {
            let property = await Property.findById(propertyId);

            if (!property) {
                res.status(404).json({
                    success: false,
                    message: 'Property not found.'
                });
                return;
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
    }
        else {
            res.status(401).json({
                success: false,
                message: 'User either does not exist or is not approved to update a property.'
            });
            return;
        }
    
}

// Delete a property => /properties/:propertyId/:id
exports.deleteProperty = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.is_approved) {
            let property = await Property.findById(req.params.propertyId);

            if (!property) {
                res.status(404).json({
                    success: false,
                    message: 'Property not found.'
                });
        
                return;
            }
        
            property = await Property.findByIdAndDelete(req.params.propertyId);
            res.status(200).json({
                success: true,
                message: 'Property is deleted.',
            });
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: 'User either does not exist or is not approved to delete a property.'
        });
        return;
    }

}

// Approve a property => /properties/:id
exports.appoveProperty = async (req, res, next ) => {
    const propertyId = req.params.id;
    let property = await Property.findById(propertyId);

    if (!property) {
        res.status(404).json({
            success: false,
            message: 'Property not found'
        });
        return;
    }

    property = await Property.findByIdAndUpdate(propertyId, {is_approved : true}, {
        new: true
    });

    res.status(200).json({
        success: true,
        message: 'Property has been approved for publishing.',
    });
}

// Publish a property => /properties/publish/:id
exports.publishProperty = async(req, res, next) => {
    const propertyId = req.params.id;
    let property = await Property.findById(propertyId);

    if (!property) {
        res.status(404).json({
            success: false,
            message: 'Property not found'
        });
        return;
    }
    if (property.is_approved) {
        update = { is_published : true }
        property = await Property.findByIdAndUpdate(propertyId, update, {
            new : true
        });

        res.status(200).json({
            success: true,
            message: 'Property has been published',
        });
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Property must be approved by Admin before publishing.'
        });
        return;
    }
}

// Get property by address => /properties/:address
exports.getProperty = async (req, res, next) => {
    const address = req.params.address;

    const property = await Property.findOne({
        address: address
    });
    // console.log(address);
    // console.log(property);

    res.status(200).json({
        success: true,
        data: property
    });
}