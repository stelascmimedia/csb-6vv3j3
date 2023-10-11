onmessage = function (e) {
  var data, url, start, fileSize;

  data = e.data;
  url = data.testFile;

  start = new Date();
  start = start.getTime();
  getFileSize();
  analyze();

  function getFileSize() {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("HEAD", url, false);
      //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            fileSize = xhr.getResponseHeader("Content-Length");
          }
        }
      };
      xhr.send(null);
    } catch (e) {}
  }

  function analyze() {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            result();
          }
        }
      };
      xhr.send(null);
    } catch (e) {
      postMessage(null);
    }
  }

  function result(v) {
    var end, vitesse, duration, message;

    end = new Date();
    end = end.getTime();
    duration = (end - start) / 1000;

    //octet -> mégaoctet
    fileSize = fileSize * 0.000001;
    //mégaoctet -> mégabits
    fileSize = fileSize * 8;

    vitesse = Math.round((fileSize / duration) * 10) / 10;

    message =
      '{"fileSize":' +
      fileSize +
      'Mb, "duration":' +
      duration +
      's, "vitesse":' +
      vitesse +
      "Mbps}";

    postMessage(message);
  }
};
