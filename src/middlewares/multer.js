const { log } = require("console");
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let imagepath = req.originalUrl.includes('products') ? 'products': 'users'
        /* console.log("imagepath: ", imagepath);
        console.log("originalUrl: ",req.originalUrl);
 */        cb(null, path.join(__dirname, `../../public/img/${imagepath}`));
        /* console.log(path.join(__dirname, `../../public/img/${imagepath}`)); */
    },
    filename: function (req, file, cb) {
        let imagepath = req.originalUrl.includes('products') ? 'product-': 'user-'
        /* console.log("Multer FILENAME");
        console.log("imagepath: ", imagepath);
        console.log("originalUrl: ",req.originalUrl); */
        cb(null, `${imagepath}` + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ 
    storage : storage, 
    fileFilter: function(req, file, cb) {
        const allowExtensions = ["png", "jpg", "jpeg", "gif", "webp"];
        const fileExtensions = path.extname(file.originalname).toLowerCase().substring(1);

        if(!allowExtensions.includes(fileExtensions)) {
            req.fileValidationError = "La imagen debe estar en formato PNG, JPG, JPEG o WEBP"
            return cb(null, false, new Error("La imagen debe estar en formato PNG, JPG, JPEG o WEBP"))
        }

        cb(null, true)
    }
})
module.exports = upload;
