function preview_customer_json(json){

}

function preview_customer_func(dom){
	var el = $(dom);

	var id = el.find('[name="c_id"]').val();

	var tes;
	for (var i = 0; i < units.length; i++) {
		tes = units[i];
		if (tes.c_id === parseInt(id)) {
			customer_json = tes;
			preview_customer_json(customer_json);
		}
	}
}
$(document).ready(function(){
	$.ajax({
		url: url('api/master/customer/get_customer'),
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
					content.attr('pusatriyal-target', 'includes/penjualan/customer/preview-customer.html');
					content.attr('pusatriyal-callback', 'preview_customer_func');
					content.append(
						'<input type="hidden" name="c_id" value="' + unit.c_id + '">'
					)
					content.find('.card-title').text( 
						unit.c_code
					);
					content.find('.card-subtitle').html( 
						'<table class="table">'+
							'<tr>'+
								'<th width="30%">Nama</th>'+
								'<td>'+unit.c_name+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>Alamat</th>'+
								'<td>'+unit.c_address+'</td>'+
							'</tr>'+
						'</table>'
					);
					content.find('.card-info-first').text( 
						'No HP :'+
						unit.c_hp
					);
					if(unit.c_type === 'B'){
						content.find('.card-info-second').text( 
							'Type Customer : Barang'
						);
						content.find('.card-info-second').addClass('badge-secondary')
					} else if(unit.c_type === 'R'){
						content.find('.card-info-second').text( 
							'Type Customer : Real'
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

	$('#input-filter-customer').on('keyup', function(){
		// Declare variables
		var input, filter, ul, li, a, i, txtValue;
		input = document.getElementById('input-filter-customer');
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
})