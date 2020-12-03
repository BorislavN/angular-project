function globalErrorHandler(err, req, res, next) {
   const tokens = err.message.split(__delimiter);
   const badMessage = "Something went wrong on the server or in the database. Check the server for more information.";

   if (tokens.length >= 2) {
      res.status(+tokens[0]).json({ "message": tokens[1] });
   } else {
      res.status(500).json({ "message": badMessage });
      console.log(`An Error occurred: ${err.message}`);
      console.log(err);
   }
}

module.exports = globalErrorHandler;