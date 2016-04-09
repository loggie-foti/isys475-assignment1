var mongoose = require('mongoose');
var AbortionSchema = new mongoose.Schema({
    _id: String,
    value: Number,
},
{
    collection: 'abortion_counts_collection'
});
mongoose.model('Abortion', AbortionSchema);