$('#list-for-filter').html('');

function getData(){
	$.ajax({
		type: 'get',
		dataType: 'JSON',
		url: url('api/notif'),
		success : function(response){
			var dom = $('rawcontent').html();

			console.log(response);
			for (var i = 0; i < response.length; i++) {
				var datai = response[i];
				var el = $(dom);
				el.find('.card-title').text(datai.n_menu);
				el.find('.card-subtitle').text(datai.n_code + ' telah dibuat.');
				el.find('.card-info-first').text(datai.n_insert);

				$('#list-for-filter').append(el);
			}


		}
	});
}

getData();

$('#btn-refresh').click(function(){
	$('#list-for-filter').html('');
	getData();
});