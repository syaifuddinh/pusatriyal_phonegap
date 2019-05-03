function getData(){
	$.ajax({
		url: url('api/notif'),
		type: 'get',
		dataType: 'JSON',
		success : function(response){
			$('#list-for-filter').html('');
			datai = null;

			var dom = $('rawcontent').html();
			console.log(response);
			for (var i = 0; i < response.length; i++) {
				datai = response[i];
				var el = $(dom);
				el.find('.card-title').text(datai.n_menu);
				el.find('.card-subtitle').text(datai.n_code + ' telah dibuat.');
				el.find('.card-info-first').text(datai.n_insert);

				$('#list-for-filter').append(el);
			}

			el = null;
		}
	});
}

getData();

$('#btn-refresh').click(function(){
	$('#list-for-filter').html('');
	getData();
});