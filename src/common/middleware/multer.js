import multer from "multer";

export const upload = () => {
    const storage = multer.diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })

    const fileFilter = (req, file, cb) => {
        const allow_type = ['image/jpeg', 'image/jpg','image/png']
        if (!allow_type.includes(file.mimetype)) {
            return cb(new Error("Invalid format"), false);
        }      
        cb(null, true)
    }
    return multer({ storage, fileFilter });
};