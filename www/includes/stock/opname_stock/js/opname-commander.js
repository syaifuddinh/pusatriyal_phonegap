$('.input-daterange').datepicker({
	format:'dd-mm-yyyy'
});

function preview_opname_json(json){

}

function preview_opname_func(dom){
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
	// Date Range Picker
	$("#from").datepicker({
		// setDate: new Date(),
		defaultDate: new Date(),
		changeMonth: true,
		numberOfMonths: 3,
		prevText: '<i class="fa fa-chevron-left"></i>',
		nextText: '<i class="fa fa-chevron-right"></i>',
		onClose: function (selectedDate) {
			$("#to").datepicker("option", "minDate", selectedDate);
		}
	});
	$("#to").datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 3,
		prevText: '<i class="fa fa-chevron-left"></i>',
		nextText: '<i class="fa fa-chevron-right"></i>',
		onClose: function (selectedDate) {
			$("#from").datepicker("option", "maxDate", selectedDate);
		}
	});

	var cur_date = new Date();
	$("#from").datepicker("setDate", new Date(cur_date.getFullYear(), cur_date.getMonth(), 1));
	$("#to").datepicker("setDate", new Date(cur_date.getFullYear(), cur_date.getMonth()+1, 0));

	function Retrieve_Items_Date(){
		var f = $('#form_date_range');
		var dataX = f.find('input').serialize();
		console.log(dataX);
		$('#list-for-filter').html('');
		$.ajax({
			url: url('api/riyal/stock/opname_stock/get_items_date'),
			type    : 'get',
			data : dataX,
			// dataType : 'json',
			success : function(resp){
				var card = $('.card');
				units = resp.items;
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
						content.attr('pusatriyal-target', 'includes/stock/opname_stock/preview-opname.html');
						content.attr('pusatriyal-callback', 'preview_opname_func');
						content.append(
							'<input type="hidden" name="or_id" value="' + unit.or_id + '">'
						)
						content.find('.card-title').text( 
							unit.or_date
						);
						content.find('.card-subtitle').html( 
							unit.or_code
						);
						content.find('.card-info-first').text( 
							'Posisi : '+
							unit.posisi.p_gudang
						);
						if(unit.or_status === 'W'){
							content.find('.card-info-second').text( 
								'Status : Waiting'
							);
							content.find('.card-info-second').addClass('badge-warning')
						} else if(unit.or_status === 'N'){
							content.find('.card-info-second').text( 
								'Status : Di tolak'
							);
							content.find('.card-info-second').addClass('badge-danger')
						} else if(unit.or_status === 'A'){
							content.find('.card-info-second').text( 
								'Status : Di setujui'
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
	}

	$('#from').on('change', function() {
		Retrieve_Items_Date();
	});
	$('#to').on('change', function() {
		Retrieve_Items_Date();
	});


	$('#input-filter-opname').on('keyup', function(){
		// Declare variables
		var input, filter, ul, li, a, i, txtValue;
		input = document.getElementById('input-filter-opname');
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

	Retrieve_Items_Date();
})