
var makeRegex = function (matchText) {
  return new RegExp('\\b' + matchText, 'ig');
}

var replaceText = function ($matchingTextNodes, replacementText, regex) {
  $matchingTextNodes.replaceWith(function () {
    return $(this).text().replace(regex,
        '<span class="fake-news">' + replacementText + '</span>');
  });
};

var walk = function($nodes, matchText, replacementText) {
  var $contents = $nodes.contents();
  // making regex using the first element
  var regex = makeRegex(matchText);
  var $matchingTextNodes = $contents.filter(function () {
    return this.nodeType === 3 &&
           $(this).text().match(regex);
  });
  var $elementNodes = $contents.filter(function () {
    return this.nodeType === 1
            && this.tagName.toLowerCase() !== 'script'
            && this.tagName.toLowerCase() !== 'style';
  });
  replaceText($matchingTextNodes, replacementText, regex);
  if ($elementNodes.length > 0) {
    walk($elementNodes, matchText, replacementText);
  }
};

var walkAllPairs = function() {
  chrome.storage.sync.get('replacementPairs', function (result) {
    var replacementPairs = result.replacementPairs;
    console.log(replacementPairs);
    for (var i = 0; i < replacementPairs.length; i+=2) {
      // find text that matches the first element
      var matchText = replacementPairs[i];
      var replacementText = replacementPairs[i + 1];
      walk($('body'), matchText, replacementText);
    }
  });
};

window.walkAllPairs = walkAllPairs;
walkAllPairs();
