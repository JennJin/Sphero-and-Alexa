module.exports = function(app, queue) {  
  // here we list our individual sets of routes to use
  require('./routes/spheroAPI')(app, queue);
};