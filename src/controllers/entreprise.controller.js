const Freelance = require("../models/freelance_model");
const Mission = require("../models/mission_model");
const Entreprise = require("../models/entreprise_model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.createMission = (req, res) => {
  Mission.create({
    entrepriseCreateMission: req.userToken.id,
    datedebut: req.body.datedebut,
    datefin: req.body.datefin,
    montanttotal: req.body.montanttotal,
    description: req.body.description,
    titre: req.body.titre,
    metier: req.body.metier,
    competence: req.body.competence,
    statusCandidat: req.body.statusCandidat,
  })
    .then((mission) => {
      if (mission.statusCandidat.length === 0) {
        Mission.findByIdAndRemove(mission._id)
          .then(() => {
            return res.status(400).send({
              message: `choose a Freelancer`,
            });
          })
          .catch((err) => res.status(400).send(err));
      } else if (mission.statusCandidat.length > 3) {
        Mission.findByIdAndRemove(mission._id)
          .then(() => {
            return res.status(400).send({
              message: "max 3 freelance",
            });
          })
          .catch((err) => res.status(400).send(err));
      } else {
        for (let index = 0; index < mission.statusCandidat.length; index++) {
          Entreprise.findById(req.userToken.id).then((EntrepriseEmail) => {
            Freelance.findByIdAndUpdate(
              { _id: mission.statusCandidat[index] },
              { $push: { mission: mission._id, status: "pending" } }
            ).then((freelanceEmail) => {
              Nodemailer(freelanceEmail.email, EntrepriseEmail.email);
            });
          });
        }
        res.status(200).send({
          message: "Freelance add to mission",
        });
      }
    })
    .catch((err) => res.status(400).send(err));
};

exports.updateMission = (req, res) => {
  if (
    req.body.status === "in progress" ||
    req.body.status === "close" ||
    req.body.status === undefined ) {
    if (
      req.body.statusCandidat.length <= 0 ||
      req.body.statusCandidat === undefined) {
      Mission.findByIdAndUpdate(req.params.id, req.body)
        .then((mission) => {
          if (mission.entrepriseCreateMission === req.userToken.id) {
            if (!mission) {
              return res.status(404).send({
                message: "Mission not found",
              });
            }
            if (
              mission.status === "in progress" ||
              mission.status === "close" ) {
              res.status(200).send({
                message: "Title of the mission changed",
              });
            } else {
              Mission.findOneAndUpdate(
                { status: mission.status },
                { status: "in progress" }
              );
              res.status(400).send({
                message: "Your mission has to be in progress or close",
              });
            }
          } else {
            res.status(404).send({
              message: "you have not the permission to modify this mission",
            });
          }
        })
        .catch(() =>
          res.status(400).send({
            message: "id doesn't exist",
          })
        );
    } else {
      res.status(400).send({
        message: "max 3 freelance",
      });
    }
  } else {
    res.status(400).send({
      message: "Your mission has to be in progress or close",
    });
  }
};

exports.viewProfil = (req, res) => {
  Entreprise.findById(req.userToken.id)
    .then((entreprise) => {
      res.send(entreprise);
    })
    .catch((err) => res.status(400).send(err));
};

exports.updateProfil = (req, res) => {
  Entreprise.findById(req.userToken.id).then((entreprise) => {
    let verifypassword = bcrypt.compareSync(
      req.body.password,
      entreprise.password
    );
    if (!verifypassword) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    Entreprise.findOne({ email: req.body.email }).then((email) => {
      if (email) {
        return res.status(404).send({
          message: "Email is already exist",
        });
      } else {
        Entreprise.findByIdAndUpdate(req.userToken.id, req.body)
          .then((profil) => {
            res.status(200).send({
              message: "Your profil is update",
            });
          })
          .catch((err) => res.status(400).send(err));
      }
    });
  });
};

exports.mission = (req, res) => {
  Mission.find({ entrepriseCreateMission: req.userToken.id })
    .then((missions) => {
      res.send(missions);
    })
    .catch((err) => res.status(400).send(err));
};

exports.freelance = (req, res) => {
  Freelance.find().then((freelance) => {
    res.send(freelance);
  });
};

exports.forgetPassword = (req, res) => {
  Entreprise.findOne({ email: req.body.email }).then((entreprise) => {
    if (!entreprise) {
      return res.status(404).send({
        message: "email not found",
      });
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
      entreprise
        .updateOne(
          { password: entreprise.password },
          { password: req.body.password }
        )
        .then((profil) => {
          res.status(200).send({
            message: "Your password is update",
          });
        })
        .catch((err) => res.status(400).send(err));
    }
  });
};

function Nodemailer(EmailFreelance, EmailEntreprise) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "demoAPIkyllian@gmail.com",
      pass: "demoAPIkyllian1234",
    },
  });
  let info = transporter.sendMail({
    from: "<" + EmailEntreprise + ">",
    to: "<" + EmailFreelance + ">",
    subject: "You have selected to a new mission",
    text: `
      Hello, 
  
      You have been selected to participate at an mission, 
      Do you accept or decline this mission ?
      `,
  });
}
