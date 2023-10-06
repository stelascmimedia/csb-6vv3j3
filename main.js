const result = document.getElementById("result");

if (window.Worker) {
  const worker = new Worker("worker.js");

  worker.onmessage = workerResultReceiver;
  worker.onerror = workerErrorReceiver;

  worker.postMessage({
    testFile: "pictureForBandepassante.jpg"
  });

  function workerResultReceiver(e) {
    //alert(e.data);
    //self.test = e.data;
    result.textContent = e.data;
  }

  function workerErrorReceiver(e) {
    console.log("A webworker error has occurred " + e);
  }
}
