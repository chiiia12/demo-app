
function load(){
	var menuType='user';
	$('[data-menu="'+menuType+'"]').addClass('menu_active');
	clickTab(menuType);
}

$('.menu').click(function(){
		$('[data-menu]').removeClass('menu_active');
		var menuType = $(this).attr('data-menu');
		clickTab(menuType);
});

function clickTab(menuType){
			$('[data-menu="'+menuType+'"]').addClass('menu_active');
		$('#tag-content,#popular-content,#user-content').css('display','none');
		$('#'+menuType+'-content').css('display','block');
		if(menuType!=="popular"){
		$('#'+menuType+'-search-btn').click(function(){
			var searchWord = $('#'+menuType+'-search-word').val();
			if(searchWord!==""){
			loadArticle(menuType,searchWord);
		}else{
			$('#'+menuType+'-error-msg').html(menuType+'名を入力してください');
			$('#'+menuType+'-element').html('');
			$('#'+menuType+'-recommend-area').css('display','block');
		}
		});

		$('#'+menuType+'-recommend-list > li > a').click(function(){
			searchWord = $(this).html();
			$('#'+menuType+'-search-word').val(searchWord);
			console.log(searchWord);
			loadArticle(menuType,searchWord);

		});
		}else{
			loadArticle(menuType,'null');
		}
}

function loadArticle(menuType,searchWord){
		var menuTypeInfo={
			'user':'u:'+searchWord,
			'tag':'t:'+searchWord,
			'popular':'popular'
		}
		$('#'+menuType+'-error-msg').empty();
		$('#'+menuType+'-recommend-area').css('display','none');
		$('#'+menuType+'-element').html('');
		$('.loading').html('<img src="img/ajax-loader.gif">');
		$.ajax({
			type:'GET',
			url:'http://feeds.pinboard.in/json/'+menuTypeInfo[menuType],
			dataType:'jsonp',
			jsonp:'cb',
			success:function(json){
				$('.loading').empty();
				for(i=0;i<10;i++){
					var title = json[i].d,
					url = json[i].u,
					disc = json[i].n;
					$('<div></div>').html('<a href="'+url+'"<h3>'+title+'</h3></a><p class="disc">'+disc+'</p><hr>').appendTo('#'+menuType+'-element');
				}

			},
			error:function() {
				alert('もう一度試してください。');
			}
		});
}

