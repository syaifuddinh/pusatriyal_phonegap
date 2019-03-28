$(document).ready(function(){

	function ajax_penjualan_manasik(){
		selectx = 'CR';
		$.ajax({
			url: url('api/marketing/manasik/penjualan_manasik/table'),
			type    : 'get',
			data 	: {
				select : selectx,
				sessioncode : localStorage.getItem('kode_pelaksanaan')
			},
			dataType : 'json',
			success : function(resp){
				var card = $('.card');
				units = resp;
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
						content.attr('pusatriyal-target', 'includes/manasik/penjualan_manasik/tab_pembayaran/preview-pembayaran.html');
						content.attr('pusatriyal-callback', 'preview_pembayaran_func');
						content.append(
							'<input type="hidden" name="sm_id" value="' + unit.sm_id + '">'
						)
						content.find('.card-title').text( 'No. Antrian '+
							unit.sm_antrian
						);
						content.find('.card-subtitle').text( 
							unit.c_name
						);
						content.find('.card-info-first').text( 
							unit.c_hp
						);
						if(unit.sm_status === 'CR'){
							content.find('.card-info-second').text( 
								'Waiting'
							);
							content.find('.card-info-second').addClass('badge-warning')
						} else if(unit.sm_status === 'PY'){
							content.find('.card-info-second').text( 
								'Dibayar'
							);
							content.find('.card-info-second').addClass('badge-info')
						} else if(unit.sm_status === 'RC'){
							content.find('.card-info-second').text( 
								'Diterima'
							);
							content.find('.card-info-second').addClass('badge-success')
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
	};
	ajax_penjualan_manasik();

	$('#input-filter-penjualan').on('keyup', function(){
		// Declare variables
		var input, filter, ul, li, a, i, txtValue;
		input = document.getElementById('input-filter-penjualan');
		filter = input.value.toUpperCase();
		ul = document.getElementById("list-for-filter");
		li = ul.getElementsByClassName('card-filter');

		// Loop through all list items, and hide those who don't match the search query
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByClassName("card-body")[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	});
	
});