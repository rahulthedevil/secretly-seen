console.log("HideMe");

// eslint-disable-next-line no-undef
chrome.storage.local.get(["read"], ({ read }) => {
  localStorage.setItem("read", read);

  var s = document.createElement('script');
  // eslint-disable-next-line no-undef
  s.src = chrome.runtime.getURL('injector.js');
  s.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
});