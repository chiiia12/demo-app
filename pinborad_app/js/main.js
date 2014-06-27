$('.tab-menu').click(function(){
		$('.tab-menu').removeClass('is-active');
		var href = $(this).attr('href');
		var menuType = href.slice(1)
		console.log(href,menuType);
		clickTab(menuType);
});

function clickTab(menuType){
		$('[href="#'+menuType+'"]').addClass('is-active');
		$('#tag-content,#popular-content,#user-content').addClass('is-hidden');
		$('#'+menuType+'-content').removeClass('is-hidden');

		if(menuType!=="popular"){
			$('#'+menuType+'-search-btn').click(function(){
				var searchWord = $('#'+menuType+'-search-word').val();
				switchSearchmode(menuType,searchWord)();
			});
			$('#'+menuType+'-recommend-list > li > a').click(function(e){
				var searchWord = $(this).html();
				switchSearchmode(menuType,searchWord)();
				// e.preventDefault();	
			});
		}else{
			var searchWord="";
			loadArticle(menuType,searchWord)();
		}
}
function switchSearchmode(menuType,searchWord){
				$('#'+menuType+'-search-word').val(searchWord);
				if(searchWord!==""){
					loadArticle(menuType,searchWord)();
				}else{
					$('#'+menuType+'-error-msg').html(menuType+'名を入力してください');
					$('#'+menuType+'-element').html('');
					$('#'+menuType+'-recommend-area').removeClass('is-hidden');
				}
}

function loadArticle(menuType,searchWord){
		var menuTypeInfo={
			'user':'u:'+searchWord,
			'tag':'t:'+searchWord,
			'popular':'popular'
		}
		$('#'+menuType+'-error-msg').empty();
		$('#'+menuType+'-recommend-area').addClass('is-hidden');
		$('#'+menuType+'-element').html('');
		
		requestArticle(menuType,menuTypeInfo[menuType])();
		
}
function requestArticle(menuType,urlType){
	$('.is-loading').html('<img src="img/ajax-loader.gif">');	
	$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/'+urlType,
			dataType:'jsonp',
			jsonp:'cb',
			success:function(json){
				showArticle(menuType,json)();
			},
			error:function() {
				requestError();
			}
	});	
}
function showArticle(menuType,json){
	$('.is-loading').empty();
	for(i=0;i<10;i++){
	var title = json[i].d,
		url = json[i].u,
		disc = json[i].n;
	$('<div></div>').addClass('margin-ofparts').html('<a href="'+url+'"<h3>'+title+'</h3></a><p class="article-disc margin-ofparts">'+disc+'</p><hr>').appendTo('#'+menuType+'-element');
				}
}
function requestError(){
	alert('読み込みに失敗しました。');
}
