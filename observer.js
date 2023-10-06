//test la présence de seedtag + remove de conteneur seedtag
var targetNode = document.getElementById("result");
var config = { childList: true };

var callback = function (mutationsList) {
  for (var mutation of mutationsList) {
    console.log(mutation);
    if (mutation.type == "childList") {
      if (targetNode.textContent != "") {
        console.log("Récupération contenu duration GOOD");
        observer.disconnect();
      }
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
