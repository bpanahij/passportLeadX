var _ = require('underscore');
var EventModel = require('../models/EventModel');
module.exports = function(app)
{
  app.get('/event/:eventId', function(req, res)
  {
    console.log('get', req.params);
    EventModel.findById(req.params.eventId, function(err, Event)
    {
      res.json(Event);
    });
  });
  app.post('/event', function(req, res)
  {
    EventModel.findById(req.body._id, function(err, event)
    {
      if (_.isEmpty(event))
      {
        event = new EventModel(req.body);
        event.save(function(err) {
          res.json(event);
          return;
        });
      }
      event.update(_.omit(req.body, '_id'), {}, function(err, rawDoc) {
        console.log(err, rawDoc);
        res.json(req.body);
      });
      return;
    });
  });
  app.get('/event', function(req, res)
  {
    EventModel.find(req.query, function(err, events)
    {
      res.json(events);
    });
  });
}
