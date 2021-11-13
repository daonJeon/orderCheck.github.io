
var layerset = null;

var cntwrap = '#wrap',  // 페이지 컨텐츠 영역
	layer = '.layer-pop', // 레이어 팝업 공통 클래스
	layercnt = '.layer-cnt', // 레이어 팝업 내 컨텐츠 영역 클래스
	onClass = 'now-open'; // 레이어 팝업 오픈 시킨 버튼에 지정될 임시 클래스

function popSet(tg, btn, bgSet, middle){
	if(bgSet == null) {
		tabIndexOff(cntwrap);
	} else {
		layerset = bgSet;
		indexOffScroll(cntwrap);
	}
	if(middle == true)	popPos(tg);
	else null;
	if(btn != null) btn.classList.add(onClass);
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
function layerOpenBtn(e, pos){

	var btn = e,
	tg = btn.getAttribute('data-target');
	bgSet = btn.getAttribute('data-layerset');

  document.querySelector('#'+tg+'').style.display = "block"
  document.querySelector('#'+tg+''+layercnt).setAttribute('tabindex','0').focus()
  popSet(document.querySelector('#'+tg+''), btn, bgSet, true);
}

// 이벤트 호출용 함수
function layerOpen(e, pos, bgset){
	var tg = e,
	bgSet = bgset;

  document.querySelector('#'+tg+'').style.display = "block"

  document.querySelector('#'+tg+''+layercnt).setAttribute('tabindex','0').focus()

  popSet(tg, null, bgSet, true);
}

//닫기용 함수 - 레이어 전체
function layerClose(){
  document.querySelector(layer).style.display = "none"

	if(layerset != null) indexOnScroll(cntwrap);
	else tabIndexOn(cntwrap);
	document.querySelector('.'+onClass+'').focus().classList.remove(onClass);
	layerset = null;
}

//닫기용 - 팝업 어려개일 경우 현재 팝업만 닫기.
function layerCloseThis(e){
	thisLayer = e;
	thisLayer.closest('.layer-pop').style.display = "none"
}

function layerOpenFunc (layer) {
  layerBtn = document.querySelectorAll(".open-layer")
  Array.prototype.forEach.call(layerBtn, function(btn, idx){
    btn.addEventListener("click",function () {
      layerOpen(layer);
    })
  })
}

/* 레이어 팝업 기능 안내
값이 없을 경우 - 배경화면 스크롤 유지
'fixed' 일 경우 - 배경화면 position 속성을 fixed 로 설정

*/