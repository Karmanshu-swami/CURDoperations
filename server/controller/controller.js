const Userdb = require('../model/model');

// Create and save new user
exports.create = (req, res)=>{
    // validate user
    if(!req.body){
        res.status(400).send({message : "Form cannot be empty"})
        return;
    }

    // creating new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    });

    // saving the data in the database
    user
    .save(user)
    .then(data =>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message : err.message || "Some error occured while creating user!"
        });
    });
};

// retrieve and return all or single user
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message : `User didn't find by the id ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message : "Error in in finding user!"});
        });
    } else{
            Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send.message({message: err.message || "Error occured while retriving data!"});
        });
    }
};

// update a single identified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message : "Data to update cannot be empty!"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify : false})
    .then(data =>{
        if(!data){
            res.status(404).send({message : `Cannot update user with ${id}. May be user not found!`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message : "Error in updating user information!"});
    });
};

// delete a user by user id
exports.delete = (req, res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message : `Cannot delete the user with id ${id}. May be id is wrong!`})
        }else{
            res.send({message : "User deleted successfully!"})
        }
    })
    .catch(err =>{
        res.status(500).send({message : `Could not delete user with id ${id}`});
    });
};