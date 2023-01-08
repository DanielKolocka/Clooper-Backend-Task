const User = require('../models/users');

// Create a new User => /user/new
exports.newUser = async(req, res, next) => {
    const user = await User.create(req.body);

    res.status(200).json({
        success: true,
        message: 'User Created',
        data: user
    });
}

// Approve user by ID  => /user/:id
exports.approveUser = async (req, res, next) => {
    let user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found."
        });
        return;
    }

    user = await User.findByIdAndUpdate(req.params.id, {is_active: true}, {
        new: true
    });
    res.status(200).json({
        success: true,
        message: "User is approved.",
        data: user
    });

}

// Deactivate a user => /user/deactivate/:id
exports.deactivateUser = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found."
        });
        return;
    }
    user = await User.findByIdAndUpdate(req.params.id, {is_active: false}, {
        new: true
    });
    res.status(200).json({
        success: true,
        message: "User is deactivated",
        data: user
    });
}