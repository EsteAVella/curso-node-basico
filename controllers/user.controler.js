const { response, request } = require('express');

const res = response;
const req = request;

const userGet = (req, res) => {
    
    const { q, name = 'no name', apikey, page, limit } = req.query;

    res.json({
        id: 1,
        msg : 'get API, controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const userPut = (req, res) => {
    
    const { id } = req.params
    const {nombre, edad, estado} = req.body;

    res.json({
        msg : 'put API, controller',
        id,
        nombre,
        edad,
        estado,
    });
}

const userPatch = (req, res) => {
    res.json({
        id: 1,
        msg : 'patch API, controller'
    });
}

const userDelete = (req, res) => {
    res.json({
        id: 1,
        msg : 'delete API, controller'
    });
}

const userPost = (req, res) => {
    res.json({
        id: 1,
        msg : 'post API'
    });
}


module.exports ={

    userGet,
    userPut,
    userPatch,
    userDelete,
    userPost
}