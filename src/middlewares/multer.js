const { log } = require("console");
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let imagepath = req.originalUrl.includes('products') ? 'products': 'users'
        console.log("imagepath: ", imagepath);
        console.log("originalUrl: ",req.originalUrl);
        cb(null, path.join(__dirname, `../../public/img/${imagepath}`));
        console.log(path.join(__dirname, `../../public/img/${imagepath}`));
    },
    filename: function (req, file, cb) {
        let imagepath = req.originalUrl.includes('products') ? 'product-': 'user-'
        console.log("Multer FILENAME");
        console.log("imagepath: ", imagepath);
        console.log("originalUrl: ",req.originalUrl);
        cb(null, `${imagepath}` + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })

module.exports = upload;

// 1. dest - указывает на папку куда будут

// сохраняться загружаемые файлы. По умолчанию

// это папка tmp, но мы можем задать свою
