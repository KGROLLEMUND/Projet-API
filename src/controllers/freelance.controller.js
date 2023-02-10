const Freelance = require("../models/freelance_model");
const bcrypt = require("bcrypt");

exports.viewProfil = (req, res) => {
    Freelance.findById(req.userToken.id).then((freelance) => {
        res.send(freelance);
    }).catch((err) => res.status(400).send(err));
}

exports.updateProfil = (req, res) => {
    Freelance.findById(req.userToken.id).then((freelance) => {
        let verifypassword = bcrypt.compareSync(req.body.password, freelance.password);
        if(!verifypassword) {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashedPassword;
        }
        Freelance.findOne({ email: req.body.email}).then((mail) => {
            if(mail) {
                return res.status(404).send({
                    message: "email is already used"
                })
            } else {
                Freelance.findByIdAndUpdate(req.userToken.id, req.body).then(() => {
                    res.status(200).send({
                        message: "Your profil is update"
                    });
                }).catch((err) => res.status(400).send(err));
            }
        })
    })
}

exports.forgetPassword = (req, res) => {
    Freelance.findOne({email: req.body.email}).then((freelance) => {
        if(!freelance) {
            return res.status(404).send({
                message:"mail not found"
            })
        } else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashedPassword;
            Freelance.updateOne(
                {password : freelance.password}, 
                {password : req.body.password})
                .then(() => {
                res.status(200).send({
                    message: "Your password changed"
                });
            }).catch((err) => res.status(400).send(err));
        }
    })
}
