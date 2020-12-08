const formidable = require("formidable");
const cloud = require("cloudinary");
const path = require("path");
const fs = require("fs");

cloud.config(require("../config/cloudinaryConfig"));
const tempPath = path.resolve(__basedir, "temp");

function checkTempDir() {
    if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath);
    }
};

function cleanTempPictures(arr) {
    arr.forEach(file => {
        fs.unlink(path.resolve(file), (err) => {
            if (err) {
                console.log(`An error occurred trying to remove a temp picture - Error: ${err.message}`);
            }
        });
    })
};

function parseFormMiddleware(req, res, next) {
    const form = formidable({ maxFileSize: 6 * 1024 * 1024, uploadDir: tempPath, keepExtensions: true });
    let tempFilePaths = [];
    let tempFields = {};

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        } else {
            for (const key in files) {
                tempFilePaths.push(files[key].path)
            }
            Object.assign(tempFields, fields);
        }
    });

    form.on("end", () => {
        Promise.all(tempFilePaths.map((entry) => {
            return new Promise((resolve, reject) => {
                cloud.uploader.upload(`temp${(entry).split("temp")[1]}`, (result, err) => {
                    if (err) {
                        reject(err);
                    }
                    const { public_id, secure_url } = result;
                    resolve({ "id": public_id, "url": secure_url });
                });
            })
        })).then(result => {
            req.body = { "pictures": result, ...tempFields };
            cleanTempPictures(tempFilePaths);
            next();
        }).catch(next);
    })
};

function deleteOldCloudinaryPictures(arr) {
    arr.forEach((picture) => {
        cloud.uploader.destroy(picture.id, function (result, err) {
            if (err) {
                console.log(`An error occurred while trying to delete a picture form cloudinary - Error: ${err}`);
            }
        });
    });
}

module.exports = {
    checkTempDir,
    parseFormMiddleware,
    deleteOldCloudinaryPictures
}