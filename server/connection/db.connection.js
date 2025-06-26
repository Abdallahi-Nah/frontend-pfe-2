const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const URI_DB = process.env.URI_DB;

const dbConnect = mongoose.connect(URI_DB + "/pfe")
                          .then(
                            () => {
                                console.log('db connected successfully');
                            }
                          )
                          .catch(
                            (err) => {
                                console.log(err);
                            }
                          );


module.exports = dbConnect;