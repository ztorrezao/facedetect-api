const handleGetProfile = (pg) => (req, res) => {
    const {
        id
    } = req.params;

    pg('users')
        .select('*')
        .where({
            id
        })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(404).json('User not found.')
            }
        })
        .catch(err => res.status(400).json('Error getting user.'));
}

module.exports = { handleGetProfile }