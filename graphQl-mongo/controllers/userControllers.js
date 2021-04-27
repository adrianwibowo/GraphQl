const  User = require("../models/user");


//event listener emiter
//promise
// mongoose method
//indesxing
//frequencyCOuntert
exports.Create = async (req, res, next) => {
    let {
        nama,
        alamat,
        todos
    } = req.body

    try {
        let row = {}

        row.nama =  nama
        row.alamat = alamat
        row.todos = todos

        await User.create(row)

        res.status(200).json({
            message: "MANTAP",
            row
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "INI ERROR"
        })
    }
};

exports.CreateTodos = async (req, res, next) => {
    let {
        name,
        description,
        complete,
        bebas
    } = req.body

    try {
        let row = await Todos.create({
            name,
            description,
            complete,
            bebas
        })

        res.status(200).json({
            message: "MANTAP Todos",
            row
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "INI ERROR"
        })
    }
};