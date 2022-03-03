
var layerset = null;

var cntwrap = '#wrap',  // 페이지 컨텐츠 영역
	layer = '.layer-pop', // 레이어 팝업 공통 클래스
	layercnt = '.layer-cnt', // 레이어 팝업 내 컨텐츠 영역 클래스
	closebtn = '.layer-close',
	onClass = 'now-open'; // 레이어 팝업 오픈 시킨 버튼에 지정될 임시 클래스
var body = document.querySelector('body');
var scrollPosition = 0;

function popSet(tg, btn, bgSet, middle){
	if(bgSet == null) {
    bodyFixed()
  } else {
    layerset = bgSet;
    bodyScrollEnable()
	}
	if(middle == true)	popPos(tg);
	else null;
}

function popPos(e){
	var tgCnt = e.querySelector(layercnt);
	var layerH = tgCnt.clientHeight() / 2;
	tgCnt.style.top = '50%'
	tgCnt.style.marginTop = '-'+layerH+'px'
}

// 팝업 오픈 시 페이지내 탭 요소 컨트롤 + 페이지 scroll 제어
function indexOffScroll(cntwrap){
	if(layerset == 'fixed') { document.querySelector(cntwrap).style.position = "fixed"}

    var allCnt = document.querySelectorAll(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input')
    Array.prototype.forEach.call(allCnt, function(cnt, idx){
      cnt.setAttribute('tabindex','-1');
	  });
}
function indexOnScroll(cntwrap){
	if(layerset == 'fixed') {document.querySelector(cntwrap).style.position = "relative"}

	var allCnt = document.querySelectorAll(''+cntwrap+' a, '+cntwrap+' button, '+cntwrap+' input')
    Array.prototype.forEach.call(allCnt, function(cnt, idx){
      cnt.setAttribute('tabindex','-1');
	  });
}

/* 변수 안내
e = 레이어 호출 버튼.
pos = 레이어 위치 관련 변수 - 값이 없을 경우 - 화면 중앙
*/

// 버튼용 함수
function layerOpenBtn(e, pos, bgSet){
	var btn = e,
	tg = btn.getAttribute('data-info');

  document.querySelector('#'+tg+'').style.display = "block"
  //document.querySelector('#'+tg+''+ layercnt).setAttribute('tabindex','0')//.focus()
  popSet(document.querySelector('#'+tg+''), btn, bgSet , true);
}

// 이벤트 호출용 함수
function layerOpen(e, pos, bgset){
	var tg = e,
	bgSet = bgset;
  document.querySelector('#'+tg+'').style.display = "block"
  document.querySelector('#'+tg+'').classList.add(onClass);
  //document.querySelector('#'+tg+''+layercnt).setAttribute('tabindex','0')//.focus()

  popSet(tg, null, bgSet, null);
}

//닫기용 함수 - 레이어 전체
function layerClose(e){
  if(e.closest(".layer-pop-type02") != null )  e.closest(".layer-pop-type02").style.display = "none"
  if(e.closest(".layerpop") != null )  e.closest(".layerpop").style.display = "none"

	//if(layerset != null) indexOnScroll(cntwrap);
	//else tabIndexOn(cntwrap);
	document.querySelector('.'+onClass).classList.remove(onClass);
  bodyScrollEnable()
	//layerset = null;
}

function layerAllClose () {
	var allLayer = document.querySelectorAll(layer)
	Array.prototype.forEach.call(allLayer, function(layerAll, idx){
		layerAll.style.display = "none"

	})
}

function layerOpenFunc (openBtns,callback) {
  layerBtn = document.querySelectorAll(openBtns)
  Array.prototype.forEach.call(layerBtn, function(btn, idx){
    btn.addEventListener("click",function (e) {
      var layer = btn.getAttribute("data-info")

	    layerAllClose()
      layerOpen(layer);
      e.currentTarget.classList.add(onClass)
      if(callback != null ) callback(e)
    })
  })

}
function layerCloseFunc (layer,closeCallback) {
  Array.prototype.forEach.call(document.querySelectorAll(".layer-close"), function(close, idx){
  close.addEventListener("click",function (e) {
      layerClose(e.target);
      if(closeCallback != null) closeCallback()
    })
  })

}

function layerFunc (openBtns,callback,closeCallback) {
  layerOpenFunc(openBtns,callback)
  layerCloseFunc(layer,closeCallback)
}



// 팝업 오픈
function bodyFixed() {
  scrollPosition = window.pageYOffset;
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = -scrollPosition+'px';
  body.style.width = '100%';
}
// 팝업 닫기
function bodyScrollEnable() {
  body.style.removeProperty('overflow');
  body.style.removeProperty('position');
  body.style.removeProperty('top');
  body.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
}

