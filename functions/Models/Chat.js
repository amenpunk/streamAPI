const admin = require("firebase-admin");
const db = admin.database();

async function addMessage(req, res, next) {
    try {
        const ref = db.ref("Chat")
        const { Message, UserID } = req.body;
        const result = await ref.push({ Message, UserID })
        return res.send({
            status : 1,
            "reason" : "successs"
        })

    } catch (err) {
        console.log(err.message)
        return next(400,err);
    }
}

async function getMessage(req, res, next) {
    try {

        const ref = db.ref("Chat")
        ref.once("value", (snap) => {
            return res.send(snap.val())
        })
    } catch (err) {
        console.log(err.message)
        return next(400,err);
    }
}

module.exports = {
    addMessage,
    getMessage
};
