const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
mongoose.plugin(slug);
mongoose.plugin(mongoose_delete, { deletedAt : true });
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true},
    description: { type: String, maxLength: 600 },
    image: {type: String},
    slug: {type: String, slug: 'name', unique: true}, 
    videoID: { type: String },
}
    , { timestamps: true }
);

module.exports = mongoose.model('Course', Course);
