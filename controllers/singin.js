const handleSingin = (pg, bcrypt) => (req, res) => {
    const {email, password} = req.body;

    pg('login').select('*').where({email})
        .then(login => {
            if (login.length) {
                const isValid = bcrypt.compareSync(password, login[0].hash);
                if (isValid) {
                    pg('users')
                        .select('*')
                        .where({
                            email
                        })
                        .then(user => {
                            res.json(user[0])
                        })
                } else {
                    res.status(400).json('Login error, check your credentials.')
                }
            } else {
                res.status(400).json('Login error, check your credentials.')
            }
        })
        .catch(err => {
            res.status(400).json(err)
        });
}

module.exports = {
    handleSingin
}