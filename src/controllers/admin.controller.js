const Admin = require("../models/admin_model");
const Mission = require("../models/mission_model");
const Competence = require("../models/competence_model");
const Metier = require("../models/metier_model");
const Freelance = require("../models/freelance_model");
const Entreprise = require("../models/entreprise_model");

exports.entreprise = (req, res) => {
  Entreprise.find().then((entreprise) => {
    res.send(entreprise);
  }).catch((err) => res.status(400).send(err));
};

exports.oneEntreprise = (req, res) => {
  Entreprise.findById(req.params.id).then((entreprise) => {
    res.send(entreprise);
  }).catch((err) => res.status(400).send(err));
};

exports.freelance = (req, res) => {
  Freelance.find().then((freelances) => {
    res.send(freelances);
  }).catch((err) => res.status(400).send(err));
};

exports.oneFreelance = (req, res) => {
  Freelance.findById(req.params.id).then((freelance) => {
    res.send(freelance);
  }).catch((err) => res.status(400).send(err));
};

exports.competences = (req, res) => {
  Competence.find().then((competence) => {
    res.send(competence);
  }).catch((err) => res.status(400).send(err));
};

exports.oneCompetences = (req, res) => {
  Competence.findById(req.params.id).then((competence) => {
    res.send(competence);
  }).catch((err) => res.status(400).send(err));
};

exports.metiers = (req, res) => {
  Metier.find().then((metier) => {
    res.send(metier);
  }).catch((err) => res.status(400).send(err));
};

exports.oneMetiers = (req, res) => {
  Metier.findById(req.params.id).then((metier) => {
    res.send(metier);
  }).catch((err) => res.status(400).send(err));
};

exports.missions = (req, res) => {
  Mission.find().then((missions) => {
    res.send(missions);
  }).catch((err) => res.status(400).send(err));
};

exports.oneMission = (req, res) => {
  Mission.findById(req.params.id).then((mission) => {
    res.send(mission);
  }).catch((err) => res.status(400).send(err));
};

exports.profil = (req, res) => {
  Admin.findById(req.userToken.id).then((admin) => {
      res.send(admin);
  }).catch((err) => res.status(400).send(err));
}

exports.createCompetence = (req, res) => {
  const newCompetence = new Competence(req.body);
  newCompetence.save().then(() => {
    res.status(201).send({
      message: "Competence is now registered.",
    });
  })
  .catch(() => {
    res.status(400).send({
      message: "Competence is already registered."
    });
  })
}

exports.createMetier = (req, res) => {
  const newMetier = new Metier(req.body);
  newMetier.save().then(() => {
    res.status(201).send({
      message: "Metier is now registered.",
    });
  })
  .catch(() => {
    res.status(400).send({
      message: "Metier is already registered."
    });
  })
}

exports.updateEntreprise = (req, res) => {
  Entreprise.findOne({email: req.body.email}).then((mail)=> {
    if(mail) {
      return res.status(404).send({
        message: "email is already exist"
      })
    } else {
      Entreprise.findByIdAndUpdate(req.params.id, req.body).then((entreprise) => {
        if(!entreprise) {
          return res.status(404).send({
            message: "Entreprise not found"
          });
        } else {
          res.status(200).send({
            message: "entreprise update"
          });
        }
        
      }).catch(() => res.status(400).send({
          message: "id doesn't exist"
        }
      ));
    }
  }).catch((err) => res.status(400).send(err));
}

exports.updateFreelance = (req, res) => {
  Freelance.findOne({email: req.body.email}).then((mail)=> {
    if(mail) {
      return res.status(404).send({
        message: "email is already exist"
      })
    } else {
      Freelance.findByIdAndUpdate(req.params.id, req.body).then((freelance) => {
        if(!freelance) {
          return res.status(404).send({
            message: "Freelance not found"
          });
        } else {
          res.status(200).send({
            message: "Freelance update"
          });
        }
        
      }).catch(() => res.status(400).send({
          message: "id doesn't exist"
        }
      ));
    }
  }).catch((err) => res.status(400).send(err));
}

exports.updateCompetence = (req, res) => {
  Competence.findOne({nom: req.body.nom}).then((competence)=> {
    if(competence) {
      return res.status(404).send({
        message: "competence is already used"
      })
    } else {
      Competence.findByIdAndUpdate(req.params.id, req.body).then((competence) => {
        if(!competence) {
          return res.status(404).send({
            message: "competence not found"
          });
        } else {
          res.status(200).send({
            message: "Competence update"
          });
        }
        
      }).catch(() => res.status(400).send({
          message: "id doesn't exist"
        }
      ));
    }
  }).catch((err) => res.status(400).send(err));
}

exports.updateMetier = (req, res) => {
  Metier.findOne({nom: req.body.nom}).then((metier)=> {
    if(metier) {
      return res.status(404).send({
        message: "name is already used"
      })
    } else {
      Metier.findByIdAndUpdate(req.params.id, req.body).then((metiers) => {
        if(!metiers) {
          return res.status(404).send({
            message: "metiers not found"
          });
        } else {
          res.status(200).send({
            message: "Metiers is update"
          });
        }
        
      }).catch(() => res.status(400).send({
          message: "id doesn't exist"
        }
      ));
    }
  }).catch((err) => res.status(400).send(err));
}

exports.updateProfil = (req, res) => {
  Admin.findById(req.userToken.id).then((admin) => {
      let passwordValid = bcrypt.compareSync(req.body.password, admin.password);
      if(!passwordValid) {
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);
          req.body.password = hashedPassword;
      }
      Admin.findOne({ email: req.body.email}).then((mail) => {
          if(mail) {
              return res.status(404).send({
                  message: "email already exist"
              })
          } else {
              Admin.findByIdAndUpdate(req.userToken.id, req.body).then((profil) => {
                  res.status(200).send({
                      message: "Profil update"
                  });
              }).catch((err) => res.status(400).send(err));
          }
      })
  })
}

exports.forgetPassword = (req, res) => {
  Admin.findOne({email: req.body.email}).then((admin) => {
      if(!Admin) {
          return res.status(404).send({
              message:"email not found"
          })
      } else {
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);
          req.body.password = hashedPassword;
          Admin.updateOne({password : admin.password} , {password : req.body.password}).then(() => {
              res.status(200).send({
                  message: "password update"
              });

          }).catch((err) => res.status(400).send(err));
      }
  })
}

exports.delEntreprise = (req, res) => {
  Entreprise.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).send({
      message: "Entreprise deleted"
    });
  }).catch((err) => res.status(400).send(err));
}

exports.delFreelance = (req, res) => {
  Freelance.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).send({
      message: "Freelance deleted"
    });
  }).catch((err) => res.status(400).send(err));
}

exports.delCompetence = (req, res) => {
  Competence.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).send({
      message: "Freelance deleted"
    });
  }).catch((err) => res.status(400).send(err));
}

exports.delMetier = (req, res) => {
  Metier.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).send({
      message: "metier deleted"
    });
  }).catch((err) => res.status(400).send(err));
}
