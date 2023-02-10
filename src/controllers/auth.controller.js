const Entreprise = require("../models/entreprise_model");
const Freelance = require("../models/freelance_model");
const Admin = require("../models/admin_model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.registerAdmin = async (req, res) => {
  const sendEmailName = req.body.lastName;
  const sendEmail = req.body.email;
  Admin.find()
    .then((admin) => {
      if (admin.length === 0) {
        const newAdmin = new Admin({
          AdminName: "Admin",
          AdminEmail: req.body.AdminEmail,
          AdminPassword: req.body.AdminPassword,
        });
        newAdmin
          .save()
          .then((admin) => {
            res.status(201).send({
              message: "Admin created ",
            });
            const accountType = admin.accountType;
            sendNodemailer(sendEmail, accountType);
          })
          .catch(() => {
            res.status(400).send({
              message: "Admin already created",
            });
          });
      } else {
        return res.status(404).send({
          message: "An Admin already exist",
        });
      }
    })
    .catch((err) => res.status(400).send(err));
};

exports.registerEntreprise = async (req, res) => {
  const sendEmailName = req.body.lastName;
  const sendEmail = req.body.email;
  const newEntreprise = new Entreprise(req.body);
  newEntreprise
    .save()
    .then((entreprise) => {
      res.status(201).send({
        message: "You are now registered.",
      });
      const accountType = entreprise.accountType;
      sendNodemailer(sendEmailName, sendEmail, accountType);
      sendNodemailerToAdmin( sendEmail, accountType);
    })
    .catch(() => {
      res.status(400).send({
        message: "Email is already exist",
      });
    });
};

exports.registerFreelance = async (req, res) => {
  const sendEmailName = req.body.lastName;
  const sendEmail = req.body.email;
  const newFreelance = new Freelance(req.body);
  newFreelance
    .save()
    .then((freelance) => {
      res.status(201).send({
        message: "You are now registered.",
      });
      const accountType = freelance.accountType;
      sendNodemailer(sendEmailName, sendEmail, accountType);
      sendNodemailerToAdmin( sendEmail, accountType);
    })
    .catch(() => {
      res.status(400).send({
        message: "Email is already exist",
      });
    });
};

exports.loginAdmin = async (req, res) => {
  Admin.findOne({ AdminEmail: req.body.AdminEmail })
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({
          message: "admin not found",
        });
      }
      let verifypassword = bcrypt.compareSync(
        req.body.AdminPassword,
        admin.AdminPassword
      );
      if (!verifypassword) {
        return res.status(401).send({
          message: "password is not valid",
          auth: false,
        });
      }
      let userToken = jwt.sign(
        {
          id: admin._id,
          isAdmin: admin.isAdmin,
        },
        process.env.JWT_SECRET
      );
      res.send({
        message: "User conected",
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => res.status(400).send(err));
};

exports.loginEntreprise = (req, res) => {
  Entreprise.findOne({ email: req.body.email })
    .then((entreprise) => {
      if (!entreprise) {
        return res.status(404).send({
          message: "email not found",
        });
      }
      let verifypassword = bcrypt.compareSync(
        req.body.password,
        entreprise.password
      );
      if (!verifypassword) {
        return res.status(401).send({
          message: "password not valid",
          auth: false,
        });
      }
      let userToken = jwt.sign(
        {
          id: entreprise._id,
          isAdmin: entreprise.isAdmin,
          accountType: entreprise.accountType,
        },
        process.env.JWT_SECRET
      );
      res.send({
        message: "User conected",
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => res.status(400).send(err));
};

exports.loginFreelance = (req, res) => {
  Freelance.findOne({ email: req.body.email })
    .then((freelance) => {
      if (!freelance) {
        return res.status(404).send({
          message: "email not found",
        });
      }
      let verifypassword = bcrypt.compareSync(
        req.body.password,
        freelance.password
      );
      if (!verifypassword) {
        return res.status(401).send({
          message: "password not valid",
          auth: false,
        });
      }
      let userToken = jwt.sign(
        {
          id: freelance._id,
          isAdmin: freelance.isAdmin,
          accountType: freelance.accountType,
        },
        process.env.JWT_SECRET
      );
      res.send({
        message: "User conected",
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => res.status(400).send(err));
};

function sendNodemailer (sendEmail, accountType) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "demoAPIkyllian@gmail.com",
      pass: "demoAPIkyllian1234",
    },
  });
  if (accountType === "Admin") {
    let info = transporter.sendMail({
      from: '"test nodemaileur" <demoAPIkyllian@gmail.com>',
      to:  "<" + sendEmail + ">",
      subject: "You're now registered",
      text: 
      `Hello, 
      you are now register as admin`,
    });
  }
  if (accountType === "freelance") {
    let info = transporter.sendMail({
      from: '"test nodemaileur" <demoAPIkyllian@gmail.com>',
      to: "<" + sendEmail + ">",
      subject: "You're now registered",
      text: 
      `Hello, 
      you are now register as freelance`,
    });
  }
  if (accountType === "entreprise") {
    let info = transporter.sendMail({
      from: '"test nodemaileur" <demoAPIkyllian@gmail.com>',
      to: "<" + sendEmail + ">",
      subject: "You're now registered",
      text: 
      `Hello, 
      you are now register as entreprise`,
    });
  }
}

function sendNodemailerToAdmin( sendEmail, accountType) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "demoAPIkyllian@gmail.com",
      pass: "demoAPIkyllian1234",
    },
  });
  if (accountType === "freelance") {
    let info = transporter.sendMail({
      from: "<" + sendEmail + ">",
      to: "<demoAPIkyllian@gmail.com>",
      subject: "new user",
      text: 
      `a new user is register as freelance`,
    });
  }
  if (accountType === "entreprise") {
    let info = transporter.sendMail({
      from: "<" + sendEmail + ">",
      to: "<demoAPIkyllian@gmail.com>",
      subject: "new user",
      text: 
      `a new user is register as entreprise`,
    });
  }
}
