function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

function today() {
  const tzOffset = (new Date()).getTimezoneOffset();
  return new Date(Date.now() - tzOffset * 60000);
}

function isoDate(d) {
  return d.toISOString().split('T')[0];
}
