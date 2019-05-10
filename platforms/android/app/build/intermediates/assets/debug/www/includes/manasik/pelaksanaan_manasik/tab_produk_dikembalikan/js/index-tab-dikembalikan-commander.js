$(document).ready(function(){
	$.ajax({
		url: url('api/marketing/manasik/pelaksanaan_kegiatan/getlist_status'),
		type    : 'get',
		dataType : 'json',
		success : function(resp){
			var card = $('.card');
			units = resp.data;
			var unit, rawcontent, content;
			console.log(units);
			if(units.length > 0) {
				rawcontent = $('rawcontent.datalist').html();
				for(x = 0;x < units.length;x++) {
					unit = units[x];
					console.log(unit);
					content = $(rawcontent);
					// Set-up routing untuk menampilkan preview
					content.attr('pusatriyal-role', 'routing');
					content.attr('pusatriyal-target', 'includes/manasik/pelaksanaan_manasik/tab_produk_dikembalikan/preview-pelaksanaan.html');
					content.attr('pusatriyal-callback', 'preview_pelaksanaan_func');
					content.append(
						'<input type="hidden" name="me_id" value="' + unit.me_id + '">'
					)
					content.find('.card-title').text( 
						unit.me_code
					);
					content.find('.card-subtitle').text( 
						unit.me_place
					);
					content.find('.card-info-first').text( 
						unit.me_date
					);
					if(unit.me_status === 'Y'){
						content.find('.card-info-second').text( 
							'Final'
						);
						content.find('.card-info-second').addClass('badge-success')
					} else if(unit.me_status === 'N'){
						content.find('.card-info-second').text( 
							'Waiting'
						);
						content.find('.card-info-second').addClass('badge-warning')
					}

					$('.card').append(content);
				}

			Routing.load_routing();
			}
			else {
				card.html('<div class="card-body"><h4 class="card-title">Tidak Ada Data Yang Ditampilkan</h4></div>')
			}
		},
		error: function(jqXHR, exception) {
			if (jqXHR.status === 0) {
			    alert('Not connect.\n Verify Network.');
			} else if (jqXHR.status == 404) {
			    alert('Requested page not found. [404]');
			} else if (jqXHR.status == 500) {
			    alert('Internal Server Error [500].');
			} else if (exception === 'parsererror') {
			    alert('Requested JSON parse failed.');
			} else if (exception === 'timeout') {
			    alert('Time out error.');
			} else if (exception === 'abort') {
			    alert('Ajax request aborted.');
			} else {
			    alert('Uncaught Error.\n' + jqXHR.responseText);
			}
		}
	});

    
});