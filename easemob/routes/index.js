var express = require('express');
var router = express.Router();
var rest = require('rest-js');

var restApi = rest('https://a1.easemob.com/', {
  crossDomain: true
});

var accessToken;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/easemob/token', function(req, res, next) {
  restApi.post('idesign/test/token', {
      data: {
        grant_type: 'client_credentials',
        client_id: "YXA6PpgaYBFqEeagr1ey-EgpxQ",
        client_secret:"YXA6lPusVC8gXv9MR7nTtwsj_VfwZuc"
      }
  }, function(error, data) {
    accessToken = data.access_token;
    console.log(accessToken);
    return res.status(200).send(accessToken);
  });
});

router.get('/easemob/users', function(req, res, next) {
  restApi.read('idesign/test/users?limit=20', {
    headers:{ Authorization: "Bearer "+accessToken}
  }, function(error, data) {
    if(error) return res.status(500).send(error);
    console.log(data.entities);
    return res.status(200).send(data.entities);
  });
});

module.exports = router;
