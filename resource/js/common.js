$(document).ready(function(){
	//btn-select 클릭시, optionbox 와 투명 레이어 생성
	$(".btn-select").on("click",function(){
		$(this).closest(".option-wrap").find(".option-box").toggle().next(".tr-bg").show();
		return false; 
	})		
	// btn-select 버튼 클릭시 나타나는 투명 레이어 클릭
	$(".tr-bg").on("click",function(){
		$(this).hide().prev(".option-box").hide();
		return false;
	})

	//input focus 시, 레이어 열림
	$(".search-bar input").on("focus",function() {
		$(this).closest(".search-bar").addClass("focus")
		$("#layerpop1").show().find(".search-bar input").focus()
	})
	//input focus 사라지면 활성화 취소 
	$(".search-bar input").on("blur",function() {
		$(this).closest(".search-bar").removeClass("focus").blur();
	})
	//input 내용 제거 
	$(".btn-remove").on("click",function(){
		$(this).closest(".inp-txt").find("input").val("")
	})


	//layer관련 
	$(".layerOpen").on("click", function(e){
		var getPopId = $(this).attr("href");
		var popHalf = $(getPopId).outerHeight()/2;
		var popH = $(this).offset().top;
		var layertopPos = popH-popHalf;

		openLayer(getPopId);
		if(layertopPos<0) {
			$(getPopId).css('top','10px');
		} else {
			$(getPopId).css('top',layertopPos+'px');
		}
	   
		$('html, body').animate({scrollTop : layertopPos}, 400);

		e.preventDefault();
	});
	
	$(".layer-close").on("click", function(){
		$(this).closest(".layerpop").hide();
		$(".bg").hide();
	});

	$(".bg").on("click", function(){
		$(this).closest(".layerpop").hide();
		$(this).hide();
	});

	
	//list
	$(".total-list li a,.total-list li button").on("click",function(){
		$(this).parent().toggleClass("on");
		return false; 

	})
	$(".filter-opt li a, .filter-opt li button").on("click",function(){
		$(this).parent().toggleClass("on").siblings().removeClass("on");
		return false; 
	})

	// accordion 
	accordion();

	//버튼 관련 
	$(".btn-course").on("click",function(){
		var display = $(this).next().css("display")
		
		if(display=="none") {
			$(this).next().slideDown().parent().addClass("on");
		}else{
			$(this).next().slideUp().parent().removeClass("on");
		}
		return false; 
	})

	$(".btn-more").on("click",function(){
		$(".timeline li").show();
		$(this).remove();
		return false; 
	})
	// 더보기 버튼
	var orginH = $(".btn-link").parent().outerHeight(true);

	$(".btn-link").on("click",function(){
		$(this).closest(".answerBox").find(".heightLimit").removeClass("heightLimit");
		$(this).remove();
		return false; 
	})
	//코스 정보 펼쳐보기 버튼
	$(".btn-allopen").on("click",function(){
		if($(this).hasClass("open")) {
			$(this).text("펼쳐보기").removeClass("open").prev(".timeline").find(">li").removeClass("on").find(".box-course").hide()
		} else {
			$(this).text("닫기").addClass("open").prev(".timeline").find(">li").addClass("on").find(".box-course").show()
		}
		return false; 
	})


	//스크롤 이동 
	onePage ();
	//슬라이더
	slider ();
})

function openLayer(id) {//레이어 오픈
	$(id).show();
	$(".bg").show();
}

function accordion() {// 아코디언 메뉴
	$accBox = $(".accBox");
	$accBox.find("a").on("click",function(){
		var display = $(this).next().css("display");
		if(display=="none") {
			$(this).parent().addClass("on").siblings().removeClass("on").end().find(".answerBox").stop().slideDown();
		}else{
			$(this).parent().removeClass("on").find(".answerBox").stop().slideUp();
		}
		return false;
	});
	$(".accBox li").each(function(){
		var contentShow = $(this).hasClass("on")
		if( contentShow ) {
			$(this).find(".answerBox").show();
		}
	}) 
	
}
//스크롤 이동
function onePage () {
	var $menu=$(".tab-box ul li");
	var $cnt=$(".tab-cnt li");
	var headHei=$(".tab-type1 ul").outerHeight();
	var $this = $(this);

	//1)indicator에 a를 클릭하는 경우
	$menu.children(">a").on("click",function  () {
		//1-1) indicator li에 .on 제어
		$(this).parent().addClass("on").siblings().removeClass("on");		
		//1-2) html과 body를 animate시켜 원하는 article에 이동
		var tg=$(this).attr("href");
		var posY=$(tg).offset().top-headHei;

		$(window).off("scroll");	
		$("html, body").animate({scrollTop:posY}, 500, function () {
			$(window).on("scroll");	
		});

		return false;
	});


}
//이미지 슬라이더
function slider () {
	var $visual=$(".gallery-slider .visual > li");
	var $paging=$(".gallery-slider .paging li");
	var total=$visual.length;
	var nowNum=0;
	var nextNum;
	var playNext;		

	//1) paging 버튼을 클릭하는 경우
	$paging.children().on("click",function  () {
		nextNum=$(this).parent().index();
		//clearInterval(playNext);

		//제어3) 자기자신은 클릭하지 못하게 한다
		if (nowNum==nextNum) return false;


		if(nowNum < nextNum){
			//1-1) $pagingi태그 on 클래스명 제어
			$(this).parent().addClass("on").siblings().removeClass("on");
			//1-2) $visual을 animate 시키기
			$visual.eq(nowNum).css("left","50%").stop().animate({left:"-150%"});
			$visual.eq(nextNum).css("left","150%").stop().animate({left:"50%"});
			nowNum=nextNum;
		}  else {
				$(this).parent().addClass("on").siblings().removeClass("on");
				$visual.eq(nowNum).css("left","50%").stop().animate({left:"150%"});
				$visual.eq(nextNum).css("left","-150%").stop().animate({left:"50%"});
				nowNum=nextNum;
		}

		return false;
	});

	//2) 자동으로 슬라이더 되는 경우
	function timer () {
		playNext=setInterval(function  () {
			nextNum=nowNum+1;
			if (nextNum==3) nextNum=0;
			
			//2-1) $paging태그 on 클래스명 제어
			$paging.eq(nextNum).addClass("on").siblings().removeClass("on");
			//2-2) $visual을 animate 시키기
			$visual.eq(nowNum).css("left",0).stop().animate({left:"-100%"});
			$visual.eq(nextNum).css("left","100%").stop().animate({left:0});

			nowNum++;		
			if (nowNum==3) nowNum=0;


		}, 1000);
	}

	//3) 이전, 다음 버튼을 클릭하는 경우
	$(".gallery-slider .prev_next a").on("click",function  () {
		var num=$(this).index();

		num==0? nextNum=nowNum-1 : nextNum=nowNum+1;
		if (nextNum==-1) return false;
		else if (nextNum==3) return false;
		$paging.eq(nextNum).children().click();

		return false;
	});

}