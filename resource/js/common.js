// closest 기능 함수 설정
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
  function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i,
          el = this;
      do {
          i = matches.length;
          while (--i >= 0 && matches.item(i) !== el) {};
      } while ((i < 0) && (el = el.parentElement));
      return el;
  };
}

// parents 기능 함수 - 부모요소 배열 반환
Element.prototype.parents = function(selector) {
	var elements = [];
	var elem = this;
	var ishaveselector = selector !== undefined;

	while ((elem = elem.parentElement) !== null) {
		if (elem.nodeType !== Node.ELEMENT_NODE) {
			continue;
		}

		if (!ishaveselector || elem.matches(selector)) {
			elements.push(elem);
		}
	}

	return elements;
};

//remove support
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
  };
}

//메인 , 드롭 메뉴
function dropMenuOpen (btnName, dropBox, dropBtn , textArea) {
  var btnMenu = document.querySelectorAll(dropBtn)

  clickAddClassFunc (btnName,dropBox,"on")
  clickRemoveClassFunc (btnMenu,dropBox,"on", function (target) {
    document.querySelector(btnName).querySelector(textArea).innerText = target.innerText

  })

}
dropMenuOpen ('.btn-drop','.dropdown-box','.btn-drop-menu','.name')

//우측 슬라이드 메뉴
function slideMenu () {
  clickAddClassFunc (".btn-menu",".gnb-box","open")
  clickRemoveClassFunc (".close-box",".gnb-box","open")
}

slideMenu()

//좌측 슬라이드 메뉴
//클릭 이벤트 시, add class 용
function clickAddClassFunc (clickBtn, addArea,className,callback) {
  var wrap = document.querySelectorAll(addArea);
  var btn = document.querySelectorAll(clickBtn);
  Array.prototype.forEach.call(btn, function(b, idx){
    b.addEventListener("click", function () {
      wrap[idx].classList.toggle(className);
      if(callback != null) callback()
    });
  })
}
function clickRemoveClassFunc (clickBtn, removeArea,className,callback) {
  var btn;
  typeof clickBtn  == "string" ? btn =  document.querySelectorAll(clickBtn) : btn = clickBtn;

  Array.prototype.forEach.call(btn, function(b, idx){
    b.addEventListener("click", function (e) {
      e.target.closest(removeArea).classList.remove(className);
      if(callback != null) callback(e.currentTarget)
    });
  })
}

function selectInpRangeSet(sel) {//셀렉트 박스 - 인풋 연계
  //셀렉트 박스 선택 값에 따라서 input value change
  var rangeSelect = document.querySelector(sel);
  var selectValue = rangeSelect.options[rangeSelect.selectedIndex].value
  var result = ''
  var inpTxt =  document.querySelector(".inp.inp-cal input")


  if(selectValue == 'today') result = getDate(0)
  else if(selectValue == 'yesterday') result = getDate(-1)
  else if(selectValue == 'lastweek') result = getDate(-7)
  else if(selectValue == 'thismonth') result = getDate("lastmonth")
  else if(selectValue == 'lastyear') result = getDate("lastyear")
  else if(selectValue == 'all') result = getDate(0)
  else if(selectValue == 'custom') result = getDate(0)
  inpTxt.value = result


  function getDate (gap) {
    var now = new Date();
    var resultDay;

    var nowYear = now.getFullYear(),
    nowMonth = now.getMonth() + 1,
    nowDate = now.getDate();
    nowMonth < 10 ? nowMonth = '0' + nowMonth :  nowMonth
    nowDate < 10 ? nowDate = '0' + nowDate : nowDate

    if(gap == 'lastyear') resultDay = new Date(now.setFullYear(now.getFullYear() - 1))
    else if(gap == 'lastmonth') resultDay = new Date(now.setMonth(now.getMonth() - 1))
    else resultDay = new Date(now.setDate(now.getDate() - gap));

    var resultYear = resultDay.getFullYear(),
    resultMonth = resultDay.getMonth() + 1,
    resultDate = resultDay.getDate();
    resultMonth < 10 ? resultMonth = '0' + resultMonth :  resultMonth
    resultDate < 10 ? resultDate = '0' + resultDate : resultDate

    function getResult (gap) {
      gap == 0 ? result = nowYear +'.'+ nowMonth +'.'+ nowDate : result =  resultYear +'.'+ resultMonth +'.'+ resultDate +'~'+ nowYear +'.'+ nowMonth +'.'+ nowDate
      return result

    }
    return getResult(gap)
  }

}

// 체크 박스 모두 체크 기능 추가
function agreeChkFunc (wrap, chkAllId) {
  var wrapArea = document.querySelector(wrap);
  var chk = wrapArea.querySelectorAll("input[type=checkbox]:not(#"+chkAllId+")")
  var chk_all = wrapArea.querySelector("#"+chkAllId+"")
  // 모두 체크/해제
  chk_all.addEventListener("change",function(e){
    Array.prototype.forEach.call(chk, function(chk, idx){
          if(e.target.checked) chk.checked = true
          else chk.checked = false
      })
  })
  //개별 체크 박스 제어
  Array.prototype.forEach.call(chk, function(item, idx){
    item.addEventListener("change",function(e){
      var chk_num = wrapArea.querySelectorAll("input[type=checkbox]:not(#"+chkAllId+"):checked")
      if(chk_num.length == chk.length) chk_all.checked = true
      else chk_all.checked = false

    })
  })

}

function btnRemoveFunc (wrap,btnClass) {
  var wrapArea = document.querySelector(wrap);
  var btns = wrapArea.querySelectorAll(btnClass)
  Array.prototype.forEach.call(btns, function(btn, idx){
    btn.addEventListener("click",function(e){
      var target = ''
      e.currentTarget.tagName == "button"? target = e.currentTarget : target = e.currentTarget.closest(btnClass)
      target.parentNode.removeChild (target)
    })
  })
}

function tabFunc (tabwrap) {
  var wrap = document.querySelector(tabwrap)
  var tabBtn = wrap.querySelectorAll(".tab-btn")
  var slider = wrap.querySelector(".slider")
  var tabContent = document.querySelectorAll(".content")

  Array.prototype.forEach.call(tabBtn, function(tab, idx){
    tab.addEventListener("click", function (e) {
      Array.prototype.forEach.call(tabBtn, function(tab, idx){
        tab.parentNode.classList.remove("on")
        tabContent[idx].classList.remove("active")
    })

    var id = e.target.getAttribute("data-tab");
    slider.style.width = e.currentTarget.parentNode.clientWidth + "px"
    slider.style.left = e.currentTarget.offsetLeft + "px"
    e.currentTarget.parentNode.classList.add("on")
    document.getElementById(id).classList.add("active");
    })
  })

}

function accordionFunc (btnName) {
  var title = document.querySelectorAll(btnName);

  for(var i = 0; i < title.length; i++){
    title[i].addEventListener("click", function(){
      var result = this.nextElementSibling;
      result.parentNode.classList.toggle("active");

    })
  }
}


function init () {
  //모든 페이지용 함수
  clickAddClassFunc(".btn-side-open",".sidebar","open")

}




