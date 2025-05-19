const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');

//add storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

const addFirm = async(req, res) => {
    try{
        const {firmName, area, category, region, offer} = req.body;

        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vedorId);
        if(!vendor) {
            res.status(404).json({message: "vendor not found"});
        }
        const firm  = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })

        await firm.save();
        return res.status(200).json({message: 'Firm added successfully'});
    }catch(err) {
        console.log(err);
        res.status(500).json({err: 'firm not add'});
    }

}

module.exports = {addFirm: [upload.single('image'), addFirm]}