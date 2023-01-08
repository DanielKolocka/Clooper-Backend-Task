const User = require('../models/users');

exports.newUser = async(req, res, next) => {
    const user = await User.create(req.body);

    res.status(200).json({
        success: true,
        message: 'User Created',
        data: user
    });
}

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