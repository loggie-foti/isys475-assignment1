var mongoose = require('mongoose');
var AbortionSchema = new mongoose.Schema({
    Year: String,
    Abortions: Number,
},
{
    collection: 'abortion_counts_collection'
});
mongoose.model('Abortion', AbortionSchema);