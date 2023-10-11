//test la présence de seedtag + remove de conteneur seedtag
var targetNode = document.getElementById("result");
var config = { childList: true };

var callback = function (mutationsList) {
  for (var mutation of mutationsList) {
    /*if (mutation.addedNodes[0].data) {
      console.log("Récupération contenu duration GOOD");
    }*/
    if (mutation.type === "childList") {
      if (targetNode.textContent !== "") {
        console.log("Récupération contenu duration GOOD");
        observer.disconnect();
      }
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
