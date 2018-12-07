const handleRegister = (pg, bcrypt) =>(req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    const hash = bcrypt.hashSync(password)
    // creating a transaction
    pg.transaction(trx => {
            // 1st insert
            trx('login')
                .returning('email')
                .insert({
                    email,
                    hash
                })
                .then(loginEmail => {
                    // 2nd insert
                    trx('users')
                        .returning('*')
                        .insert({
                            name,
                            email: loginEmail[0],
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);

                }).catch(err => {
                    res.status(400).json('Uneable to register the user.');
                    console.log(err.message);
                });
        })
        .catch(err => {
            res.status(400).json('Uneable to register the user.');
        });
}

module.exports = { handleRegister }