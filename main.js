function addElement(elementHTML, id) {
  // create a new div element
  const newElement = document.createElement(elementHTML);
  if (id) {
    newElement.id = id;
  }
  document.body.appendChild(newElement);
}

addElement("div", "result");

const result = document.getElementById("result");

if (window.Worker) {
  const worker = new Worker("worker.js");

  worker.onmessage = workerResultReceiver;
  worker.onerror = workerErrorReceiver;

  worker.postMessage({
    testFile: "picture124.jpg"
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
