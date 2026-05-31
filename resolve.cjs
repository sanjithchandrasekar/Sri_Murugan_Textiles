const https = require('https');

function resolveUrl(url) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log("Redirected to:", res.headers.location);
    } else {
      console.log("Final URL:", url);
    }
  }).on('error', (e) => {
    console.error(e);
  });
}

resolveUrl("https://maps.app.goo.gl/KmmoCpHPWSFyejyU7");
resolveUrl("https://maps.app.goo.gl/b1pkyb5SLfzRxzhg8");
