function selectOn (selName) {
  var wrap = document.querySelectorAll(selName);

  Array.prototype.forEach.call(wrap, function(sel){
    //인풋으로 변환
    var sel = wrap.querySelector("select"),
    selbox = wrap.querySelector(".select-box");


    sel.classList.add("hide");
  })

  var labels = document.querySelectorAll('.label');
  Array.prototype.forEach.call(labels, function(label){
    label.addEventListener('click', function (e) {
      var optionList = label.nextElementSibling;
      var optionItems = optionList.querySelectorAll('.optionItem');
      clickLabel(label, optionItems);
    })
  })

  var clickLabel = function (label, optionItems) {
    if(label.parentNode.classList.contains('active')) {
      label.parentNode.classList.remove('active');
      Array.prototype.forEach.call(optionItems, function(opt){
        opt.removeEventListener('click', function () {
            handleSelect(label, opt)
        })
      })

    } else {
      label.parentNode.classList.add('active');
      Array.prototype.forEach.call(optionItems, function(opt){
        opt.addEventListener('click', function () {
            handleSelect(label, opt)
        })
      })

    }
  }

  var handleSelect = function (label, item) {
      label.innerHTML = item.textContent;
      label.parentNode.classList.remove('active');
  }

}

selectOn (".inp-select")