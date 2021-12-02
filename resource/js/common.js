var agent = navigator.userAgent.toLowerCase();
if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
  //alert("인터넷 익스플로러 브라우저 입니다.");
  contentHeightFix(".subpage",".center-box")
} else {

}


//IE display: flex 지원용
function contentHeightFix (wrap, cntbox) {
  var page = document.querySelector(wrap)
  var contentbox = document.querySelector(cntbox)


  if(contentbox.classList.contains("narrow")) {
    setTimeout(function() {
      page.style.height = page.clientHeight + "px"
      contentbox.style.height = contentbox.clientHeight + "px"
    },300)


  } else {
    page.style.height = page.clientHeight + "px"
    contentbox.style.height = contentbox.clientHeight + "px"
  }
}

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
    if(textArea != null)  document.querySelector(btnName).querySelector(textArea).innerText = target.innerText

  })

}

//메인 , 드롭 메뉴
function dropFormMenuOpen (btnName, dropBox, dropListBtn) {
  var btnMenu = document.querySelectorAll(btnName)
  Array.prototype.forEach.call(btnMenu, function(btn, idx){
    btn.addEventListener("click",function(e) {
      e.currentTarget.classList.toggle("on")
      e.currentTarget.nextElementSibling.classList.toggle("on")
    })
    btn.classList.remove("on")
    btn.nextElementSibling.classList.remove("on")
  })



}


//우측 슬라이드 메뉴
function slideMenu () {
  clickAddClassFunc (".btn-menu",".gnb-box","open")
  clickRemoveClassFunc (".close-box",".gnb-box","open")
}

slideMenu()

//좌측 슬라이드 메뉴
//클릭 이벤트 시, add class 용
function clickAddClassFunc (clickBtn, addArea,className,callback) {
  var btn = document.querySelectorAll(clickBtn);
  var wrap = document.querySelectorAll(addArea);

  Array.prototype.forEach.call(btn, function(b, idx){
    b.addEventListener("click", function (e) {
      // Array.prototype.forEach.call(btn, function(b2, idx2){
      //   wrap[idx2].classList.remove(className)
      // })
      wrap[idx].classList.toggle(className);
      if(callback != null) callback(e)
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


function selectInpRangeSet(sel,joinDay) {//셀렉트 박스 - 인풋 연계
  //셀렉트 박스 선택 값에 따라서 input value change
  var rangeSelect = document.querySelector(sel);
  var selectValue = rangeSelect.options[rangeSelect.selectedIndex].value
  var result = ''
  var inpTxt =  document.querySelector(".inp.inp-cal input")


  if(selectValue == 'today') result = getDate(0)
  else if(selectValue == 'yesterday') result = getDate("yesterday")
  else if(selectValue == 'lastweek') result = getDate("lastweek")
  else if(selectValue == 'thismonth') result = getDate("lastmonth")
  else if(selectValue == 'lastyear') result = getDate("lastyear")
  else if(selectValue == 'all') result = getDate("all",joinDay)
  else if(selectValue == 'custom') {
    result = getDate(0)
    document.querySelector(".inp.inp-cal input").focus()
  }
  inpTxt.value = result


  function getDate (gap,joinDay) {
    var now = new Date();
    var startDay, endDay;

    var nowYear = now.getFullYear(),
    nowMonth = now.getMonth() + 1,
    nowDate = now.getDate();

    nowMonth < 10 ? nowMonth = '0' + nowMonth :  nowMonth
    nowDate < 10 ? nowDate = '0' + nowDate : nowDate

    if(gap == 'yesterday') {
      startDay = new Date(now.setDate(now.getDate() - 1));
      endDay = new Date(now.setDate(now.getDate()));
    } else if(gap == 'lastweek') {
      //지난 주 월요일부터 금요일까지
      console.log(now.getDay())
      startDay = new Date(now.setDate(now.getDate() - (now.getDay() + 6) ));
      endDay = new Date(now.setDate(now.getDate() + 4 ));
    }  else if(gap == 'lastmonth') {
      startDay = new Date(now.getFullYear(),now.getMonth(),1)
      endDay = new Date(now)
    } else if(gap == 'lastyear') {
      startDay = new Date(now.setFullYear(now.getFullYear() - 1))
      endDay = new Date(now)
    } else if(gap == 'all') {
      var word = joinDay.split(".")
      console.log(word)
      startDay = new Date(word[0],word[1]-1,word[2])
      endDay = new Date(now)
    } else {
      startDay = new Date(now);
      endDay = new Date(now);
    }

    var startYear = startDay.getFullYear(),
    startMonth = startDay.getMonth() + 1,
    startDate = startDay.getDate();

    var endYear = endDay.getFullYear(),
    endMonth = endDay.getMonth() + 1,
    endDate = endDay.getDate();

    startMonth < 10 ? startMonth = '0' + startMonth :  startMonth
    startDate < 10 ? startDate = '0' + startDate : startDate

    endMonth < 10 ? endMonth = '0' + endMonth :  endMonth
    endDate < 10 ? endDate = '0' + endDate : endDate

    function getResult (gap) {
      result =  startYear +'.'+ startMonth +'.'+ startDate +' - '+ endYear +'.'+ endMonth +'.'+ endDate
      return result
    }

    return getResult(gap)
  }

}

// 체크 박스 모두 체크 기능 추가
function agreeChkFunc (wrap, chkAllId,callback) {
  var wrapArea = document.querySelector(wrap);
  var chk = wrapArea.querySelectorAll("input[type=checkbox]:not(#"+chkAllId+")")
  var chk_all = wrapArea.querySelector("#"+chkAllId+"")

  // 모두 체크/해제
  if(chk_all != null ) {
    chk_all.addEventListener("change",function(e){
      Array.prototype.forEach.call(chk, function(chk, idx){
            if(e.target.checked) chk.checked = true
            else chk.checked = false
            if(callback != null ) callback()
        })
    })
  }
  //개별 체크 박스 제어
  Array.prototype.forEach.call(chk, function(item, idx){
    item.addEventListener("change",function(e){
      var chk_num = wrapArea.querySelectorAll("input[type=checkbox]:not(#"+chkAllId+"):checked")
      if(chk_num.length == chk.length) chk_all.checked = true
      else chk_all.checked = false
      if(callback != null ) callback()
    })
  })
  if (document.querySelector(".btn-reset") != null) chkResetFunc(".btn-reset", ".manager-box input[type=checkbox]")
}

function chkResetFunc (btn,wrap) {
  var resetBtn = document.querySelector(btn);
  resetBtn.addEventListener("click",function(e){
    var obj = document.querySelectorAll(wrap);

    for (var i = 0; i < obj.length; i++) {
      obj[i].checked = false;
    }
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

function tabFunc (tabwrap,isFullSlider,callback) {
  setTimeout(function(e) {
  var wrap = document.querySelector(tabwrap)
  var tabBtn = wrap.querySelectorAll(".tab-btn")
  var slider = wrap.querySelector(".slider")
  var tabContent = document.querySelectorAll(".content")
  var offsetPos = []

  if(callback!= null ) callback()

  // tab loading

  function getSlider (wrap,pos,idx) {
    if(isFullSlider) {
      slider.style.width =wrap.parentNode.clientWidth + "px"
      slider.style.left = pos[idx] +"px"

    } else {//로그인//담당 관리
      slider.style.width =wrap.offsetWidth + 2+ "px"
      slider.style.left = pos[idx]  + "px"

    }
  }


  Array.prototype.forEach.call(tabBtn, function(tab, idx){
    if(isFullSlider) {
      offsetPos.push(tabBtn[idx].parentElement.offsetLeft)
    } else {
      offsetPos.push(tabBtn[idx].offsetLeft)
    }

    if(tab.parentNode.classList.contains("on")) {
      getSlider(tab,offsetPos,idx,)
      if(tabContent.length > 0) tabContent[idx].classList.add("active")
    } else {
      if(tabContent.length > 0) tabContent[idx].classList.remove("active")
    }
  //클릭 이벤트
    tab.addEventListener("click", function (e) {

    Array.prototype.forEach.call(tabBtn, function(tab2, idx){
      tab2.parentNode.classList.remove("on")
        if(tabContent.length > 0) tabContent[idx].classList.remove("active")
      })

      var id = e.currentTarget.getAttribute("data-tab");
      getSlider(e.currentTarget,offsetPos,idx)
      e.currentTarget.parentNode.classList.add("on")
      if(tabContent.length > 0) document.getElementById(id).classList.add("active")
      if(callback != null ) callback()

    })


  })
  },300)//setTimeout
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

// login chk
function inpActiveFunc(wrap,btnClass,maxIsTrue) {//maxIsTrue maxlength 값과일치할때만 실행
  var scriptArea = document.querySelector(wrap);
  var input = scriptArea.querySelectorAll("input[type=text], input[type=tel],input[type=number],input[type=password]")
  var loginBtnFlag = [];
  var flag = '';

  //value값에 따라 초기값 세팅
  Array.prototype.forEach.call(input, function(inp, idx){
    maxIsTrue == true ? flag = inp.value.length == inp.getAttribute("maxlength") : flag = inp.value.length > 0
    if(flag) loginBtnFlag.push(true)
    else loginBtnFlag.push(false)
  })

  loginBtnDisabled()
  inputValLengthChk ()

  function inputValLengthChk () {
    Array.prototype.forEach.call(input, function(inp, idx){
      inp.addEventListener("keyup", function (e) {
        var checkflag = inp.parentElement;

        maxIsTrue == true ? flag =( inp.value.length == inp.getAttribute("maxlength")) : flag = inp.value.length > 0
        if(flag) {
          loginBtnFlag[idx] = true;
          checkflag.classList.add("on")
        } else {
          loginBtnFlag[idx] = false;
          checkflag.classList.remove("on")
        }

        loginBtnDisabled()
      })

      inp.addEventListener("change", function (e) {
        Array.prototype.forEach.call(input, function(inp, idx){
          maxIsTrue == true ? flag = inp.value.length == inp.getAttribute("maxlength") : flag = inp.value.length > 0
          if(flag) loginBtnFlag.push(true)
          else loginBtnFlag.push(false)
        })

        loginBtnDisabled()
      })

    })

  }
  function loginBtnDisabled () {
    var loginBtn = scriptArea.querySelector(btnClass)
    var flag = loginBtnFlag.every(function(val) {return val == true})

    if(flag) loginBtn.disabled = false//둘다 인풋 체크
    else loginBtn.disabled = true
  }

}
// login chk
function inpFileActiveFunc(wrap,btnClass) {//견적 업로드 수정 관련 input button 활성화

  var scriptArea = document.querySelector(wrap);
  var input = scriptArea.querySelectorAll("input[type=text], input[type=tel],input[type=number]")

  btnDisabled()

  Array.prototype.forEach.call(input, function(inp, idx){
    inp.addEventListener("change", function (e) {
      btnDisabled()
    })
    inp.addEventListener("input", function (e) {
      btnDisabled()
    })

  })

  function btnDisabled () {
    var loginBtnFlag = [];
    //value값에 따라 초기값 세팅
    Array.prototype.forEach.call(input, function(inp, idx){
      if(inp.value.length > 0) loginBtnFlag.push(true)
      else loginBtnFlag.push(false)
    })
    var button = scriptArea.querySelector(btnClass)
    var flag = loginBtnFlag.every(function(val) {return val == true})

    if(flag) button.disabled = false//둘다 인풋 체크
    else button.disabled = true
  }

}
// chk
function chkActiveFunc(wrap,allChk, btnClass) {
  var scriptArea = document.querySelector(wrap);
  var check = scriptArea.querySelectorAll("input[type=checkbox]:required")
  var checked = scriptArea.querySelectorAll("input[type=checkbox]:not(#"+allChk+"):required:checked")
  var confirmBtn = scriptArea.querySelector(btnClass)

  if(checked.length >= check.length) confirmBtn.disabled = false
  else confirmBtn.disabled = true;

  Array.prototype.forEach.call(check, function(chk, idx){
    chk.addEventListener("click", function (e) {
      checked = scriptArea.querySelectorAll("input[type=checkbox]:not(#"+allChk+"):checked")
      if(checked.length == check.length -1) confirmBtn.disabled = false
      else confirmBtn.disabled = true;
    })
  })
}

/* input password/text 전환 */
function inpTypeSwitch () {
  clickAddClassFunc (".btn-pw-show",".btn-pw-show","active", function (e) {
    var inputPw = e.currentTarget.previousElementSibling;
    var flag = inputPw.getAttribute("type")
    flag == "text"? inputPw.setAttribute("type","password") : inputPw.setAttribute("type","text")
  })
}

function autoHypenTelFunc (inputID,callback) {//매개변수 설명 : input ID / 하이픈 적용되어야하는 텀 (number or array)
  var input = document.querySelector("#"+inputID)
  input.addEventListener("keyup",function(e){
    var _val = this.value.trim()
    this.value = autoHypenTel(_val,callback,e.currentTarget)

  })
  //휴대폰용 하이픈 자동 추가
  function autoHypenTel (str,callback,target) {
    str = str.replace(/[^0-9]/g,'')
    var tmp = '';

    if(callback != null) callback(target)

    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    } else {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 4);
      tmp += '-';
      tmp += str.substr(7);

      return tmp;
    }

  }

}


function dropMenuShowHide (wrap,clickBtn,menuList ) {
  var dropWrap = document.querySelector(wrap)
  var btn = dropWrap.querySelector(clickBtn)
  var menu = document.querySelector(menuList)
  var menuBtn = menu.querySelectorAll(".btn-member-drop")
  var company = document.querySelector(".company")
  var desc = document.querySelector(".desc")
  var price = document.querySelector(".price var")


  //event
  btn.addEventListener("click",function(e){
    if(e.target.classList.contains("open")) {
      menuClose ()
    } else {
      menuOpen ()
      dimCreate ()
    }
  })
  Array.prototype.forEach.call(menuBtn, function(btn, idx){
    btn.addEventListener("click",function(e){
      clickResultApply (e)
      menuClose ()
    })

  })

  function menuClose () {
    btn.classList.remove("open")
    var dim = document.querySelector(".dim")
    dim.parentElement.removeChild(dim)
    dimRemove()
  }

  function menuOpen () {
    btn.classList.add("open")
  }

  function clickResultApply (e) {
    e.currentTarget.tagName != "BUTTON"? target = e.currentTarget.closest("button") : target = e.currentTarget

    var selCompany = target.querySelector(".company").innerText
    var selDesc = target.querySelector(".desc").innerText
    var selPrice = target.querySelector(".price var").innerText


    company.innerText = selCompany
    desc.innerText = selDesc
    price.innerText = selPrice

    btn.classList.add("active")
  }
  function dimCreate () {
      var dimElement = document.createElement("div")
      dimElement.classList.add("dim")
      dropWrap.appendChild(dimElement)
  }
  function dimRemove () {
    var dim = document.querySelector(".dim")
    //event
    if (dim != null) {
      dim.addEventListener("click",function(e){
        dim.parentElement.removeChild(dim)
        menuClose ()
      })

    }
  }

}

var formControlFunc = function (wrap) {
  var cntWrap = document.querySelectorAll(wrap)
  Array.prototype.forEach.call(cntWrap, function(cnt, idx){
    cnt.addEventListener("click",function (e) {
      var classFlag = e.currentTarget.classList[1]
      if( classFlag =="copy") formCopy(e)
      else if( classFlag =="delete") formDelete(e)
    })
  })
  var formCopy = function (e) {
    var formList = document.querySelector(".estimate-list")
    var formTitle = document.querySelectorAll(".estimate-list > li .txt")
    var formLi =''
    for (var title_index = 0; title_index < formTitle.length; title_index++) {
      //e.currentTarget.closest(".btn-form").querySelector(".txt").innerText

    }
    var msg = "a"

    formLi += '<li>';
		formLi += '<div class="btn-form">';
		formLi += '<span class="txt">'+msg+'</span>';
		formLi += '<div class="dropdown-wrap">';
		formLi += '<button type="button" class="btn-form-menu"><span>메뉴열기</span></button>';
		formLi += '<div class="dropdown-box">';
		formLi += '<ul>';
		formLi += '<li><a href="#" class="btn-drop-menu copy"><span>복제하기</span></a></li>';
		formLi += '<li><a href="#" class="btn-drop-menu delete"><span>삭제하기</span></a></li>';
		formLi += '<li><a href="#" class="btn-drop-menu open-layer" data-info="layer-info-url"><span>링크확인</span></a></li>';
		formLi += '</ul>';
		formLi += '</div>';
		formLi += '</div>';
		formLi += '</div>';
		formLi += '</li>';

  	formList.insertAdjacentHTML('beforeend', formLi);

    dropFormMenuOpen(".btn-form-menu")
    formControlFunc(".btn-drop-menu")
  }
  var formDelete = function (e) {
    e.currentTarget.closest(".btn-form").parentNode.parentNode.removeChild(e.currentTarget.closest(".btn-form").parentNode)
  }

}

function formSideFunc (btn,wrap) {
  var formBtn = document.querySelectorAll(btn)
  var sideLeft = document.querySelector(wrap+".left")
  var sideRight = document.querySelector(wrap+".right")
  Array.prototype.forEach.call(formBtn, function(btn, idx){
    btn.addEventListener("click",function(e) {
      var directionFlag = e.currentTarget.getAttribute("data-direction")
      if(directionFlag =="left") sideLeft.classList.toggle("open")
      else if(directionFlag =="right") sideRight.classList.toggle("open")

    })
  })
}

function inpEmptyFunc (ele) {
  var input = document.querySelectorAll(ele)
  Array.prototype.forEach.call(input, function(inp, idx){
    inp.addEventListener("focus",function(e) {
      if(e.currentTarget.value != '') e.currentTarget.value = ''

    })
  })
}

function layerLoadingByBtn (b,layer) {
  var clickBtn = document.querySelectorAll(b)

  Array.prototype.forEach.call(clickBtn, function(btn, idx){
    btn.addEventListener("click",function(e) {
      layerOpen(layer)

    })
  })
}
//고객관리 목록 상세에서 사용
layerLoadingByBtn (".tab-radio-box input[name='consult'] + label","layer-revise")

function fileUpload (fileInp) {
  var fileInput = document.querySelectorAll(fileInp)
  var btnRemove = ''

  if (fileInput.length == 0) return
  Array.prototype.forEach.call(fileInput, function(inp, idx){
    btnRemove = inp.nextElementSibling
    inp.addEventListener("change",function(e){
      var fileName = e.currentTarget.files[0].name
      e.currentTarget.previousElementSibling.value = fileName

      if(e.currentTarget.value < 1) inp.nextElementSibling.style.display = "none"
      else inp.nextElementSibling.style.display = "block"
      changeEvt(inp.previousElementSibling)
    });
  })

  btnRemove.addEventListener("click",function(e) {
    e.currentTarget.previousElementSibling.value = ''
    e.currentTarget.previousElementSibling.previousElementSibling.value = ''
    e.currentTarget.style.display = "none"
    changeEvt(e.currentTarget.previousElementSibling.previousElementSibling)
  })

}
fileUpload("input[type='file']")

function changeEvt (element) {
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    element.dispatchEvent(evt);
  } else{
    element.fireEvent("onchange");
  }
}
function keyUpEvt (element) {
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("change", false, true); // adding this created a magic and passes it as if keypressed
  element.dispatchEvent(evt);
  return false
}

function inpChangeFunc () {
  $(".inp-select").on('change', "select", function() {
    $(this).addClass("active").next().addClass("active")

    if($(this).attr("name") == "range") selectInpRangeSet (".inp-select select[name=range]","2021.01.22") //두번째 매개변수에 가입일 전달해야함
  });
}
inpChangeFunc()

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberToKorean(number){
  var inputNumber  = number < 0 ? false : number;
  var unitWords    = ['', '만', '억', '조', '경'];
  var splitUnit    = 10000;
  var splitCount   = unitWords.length;
  var resultArray  = [];
  var resultString = '';

  for (var i = 0; i < splitCount; i++){
    var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0){
        resultArray[i] = unitResult;
    }
  }

  for (var i = 0; i < resultArray.length; i++){
    if(!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
}

function autoCommasFunc (inputName,callback) {
  var input = document.getElementsByName(inputName)

  Array.prototype.forEach.call(input, function(inp, idx){
    inp.closest(".inp").nextElementSibling.style.display= "none"
    inp.addEventListener("keyup",function(e){
      var _val = e.currentTarget.value.replace(/[^0-9]/g,'')
      this.value = numberWithCommas(_val);
      e.currentTarget.closest(".inp").nextElementSibling.style.display= "block"

      if(inp.value.length < 1) e.currentTarget.closest(".inp").nextElementSibling.querySelector(".tx-org").innerText = "0원"
      else e.currentTarget.closest(".inp").nextElementSibling.querySelector(".tx-org").innerText =numberToKorean(_val) + "원"
    })

  })
}


function inputPageSelect(selName,list,card) {
  var select = document.getElementsByName(selName)
  Array.prototype.forEach.call(select, function(sel, idx){

    var wrap =  sel.closest(".content")
    var listWrap = wrap.querySelector(list)
    var cardWrap = wrap.querySelector(card)
    if (sel.value == "list") {
      cardWrap.style.display = "none"
      listWrap.style.display = "block"
    } else {
      cardWrap.style.display = "flex"
      listWrap.style.display = "none"
    }

    $(".inp-select").on('change', "select[name='"+selName+"']", function() {
      var wrap =  sel.closest(".content")
      var listWrap = wrap.querySelector(list)
      var cardWrap = wrap.querySelector(card)
      if (sel.value == "list") {
        cardWrap.style.display = "none"
        listWrap.style.display = "block"
      } else {
        cardWrap.style.display = "flex"
        listWrap.style.display = "none"
      }

    })

  })

}


function pageInit () {  //모든 페이지용 함수

  clickAddClassFunc(".btn-side-open",".sidebar","open")//사이드 메뉴
  dropMenuOpen ('.btn-drop','.dropdown-box','.btn-drop-menu','.name')//상단 드롭 메뉴
  dropFormMenuOpen(".btn-form-menu")

}


