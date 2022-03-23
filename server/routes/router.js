const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');

const services = require('../services/render')

// @description Root Route 
// Method GET /
route.get('/', services.homeRoute );

// @description Add User Route 
// Method GET /add_user
route.get('/add-user', services.add_user);

// @description Update user Route 
// Method GET /update_user
route.get('/update-user', services.update_user);

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;