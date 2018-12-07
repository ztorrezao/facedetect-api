const clarifai = require('clarifai');

// Clarifi instatiation
const app = new Clarifai.App({
    apiKey: 'a7030ab42a8d4967963f174a8c5c6106'
});


const handleImageAPIKey = () => (req, res) => {
    const {input} = req.body;

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("error fatching image recognition data data."));
};

const handleImage = (pg) => (req, res) => {
    const {
        id
    } = req.body;

    pg('users')
        .returning('entries')
        .where({
            id
        })
        .increment('entries', 1)
        .then((entries) => {
            if (entries.length) {
                res.json(entries[0]);
            } else {
                res.status(404).json('User not found.');
            }
        })
        .catch((err) => res.status(400).json('Error getting user entries.'));

}

module.exports = {handleImage, handleImageAPIKey}