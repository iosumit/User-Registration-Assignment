const getUserInfo = (req, res, next) => {
    return res.status(200).json({ status: "Success", message: "User fetched" })
}

module.exports = { getUserInfo }