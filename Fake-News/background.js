console.log('Hello from the Chrome extension!');

chrome.storage.sync.set({'replacementPairs': ['witnesses', 'these dudes I know',
                                              'allegedly', 'kinda probably',
                                              'new study', 'reddit post',
                                              'space', 'somewhere only we know',
                                              'Russia', 'Narnia',
                                              'election', 'eating contest',
                                              'Trump', 'Forest Spirit',
                                              'economy', 'social construct',
                                              'Republican', 'group of 6-year-olds',
                                              'Democrat', 'another group of 6-year-olds'
                                              'Technology', 'Pokédex']});

chrome.runtime.onInstalled.addListener(function() {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {

    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '.*' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
