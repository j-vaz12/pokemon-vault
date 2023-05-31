// module.exports = function(req, res, next) {
//     // Pass the req/res to the next middleware/route handler
//     if ( req.isAuthenticated() ) return next();
//     // Redirect to login if the user is not already logged in
//     res.redirect('/auth/google');
//   }
module.exports = function (req, res, next) {
  if ( req.isAuthenticated() ) return next();
  // Set session property for next request
  if (req.method === 'GET') req.session.redirectTo = req.url;
  res.redirect('/auth/google');
};