function preview_pelaksanaan_func(dom){
	var el = $(dom);
	var id = el.find('[name="me_id"]').val();

	var dataz;
	for(var i =0; i<units.length; i++){
		dataz = units[i];
		if(dataz.me_id === parseInt(id)){
			json_pelaksanaan = dataz;
			console.log('statement if is true');
			preview_pelaksanaan_json(json_pelaksanaan);
		}
	}


}
function preview_pelaksanaan_json(json){
	$.ajax({
		url:url('api/marketing/manasik/pelaksanaan_kegiatan/listpetugas'),
		type:'get',
		dataType:'json',
		data:{
			id:json.me_id
			
		},
		success:function(res){
			console.log(res);
			$('#employe1').val(res[0]);
			$('#employe2').val(res[1]);
			$('#employe3').val(res[2]);
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
		},
		complete:function(){
			$('.badge-nota').text(json.me_code);
			$('#tgl_pelaksanaan').val(json.me_date);
			$('#tempat').val(json.me_place);
			$('#pic').val(json.m_name);
			if(json.me_status === 'Y'){
				$('.badge-status').addClass('badge-primary').text('Status : Final');
				$('.pusatriyal-submit').find('#status-final').removeClass('d-none');
				$('.pusatriyal-submit').find('#status-waiting').addClass('d-none');
			} else if(json.me_status === 'N'){
				$('.badge-status').addClass('badge-warning').text('Status : Waiting');
				$('.pusatriyal-submit').find('#status-final').addClass('d-none');
				$('.pusatriyal-submit').find('#status-waiting').removeClass('d-none');
				$('#btn-edit').attr('pusatriyal-callback', 'edit_pelaksanaan_view');
				$('#btn-edit').attr('pusatriyal-role', 'routing');
				$('#btn-edit').attr('pusatriyal-target', 'includes/manasik/pelaksanaan_manasik/edit-pelaksanaan.html');
				$('#btn-edit').append('<input type="hidden" id="pelaksanaan_id" name="pelaksanaan_id" value="'+ json.me_id +'">');
				Routing.load_routing();
			}
			$('#me_id').val(json.me_id);
		}

	});

	$.ajax({
		url:url('api/marketing/manasik/pelaksanaan_kegiatan/listproduk'),
		type:'get',
		dataType:'json',
		data:{
			id:json.me_id
		},
		success:function(res){
			$('#div-produk-dibawa').html('');
			console.log(res);
			dom = $('rawcontent').html();
			var data;
			for(var i =0; i<res.length;i++){
				var el = $(dom);
				data = res[i];
				el.find('.btn-header').text(data.ir_name);
				el.find('.btn-header').attr('data-target', '#collapse-' + i);
				el.find('.btn-header').attr('aria-controls', '#collapse-' + i);
				el.find('.datalist-collapse').attr('id', 'collapse-' + i);
				el.find('[name="qty[]"]').val(accounting.formatNumber(data.mdt_qty,0));
				el.find('[name="terjual[]"]').val(accounting.formatNumber(data.mdt_terjual,0));
				el.find('[name="return[]"]').val(accounting.formatNumber(data.mdt_return,0));

				$('#div-produk-dibawa').append(el);
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

	})
}
$(document).ready(function(){
	$.ajax({
		url: url('api/marketing/manasik/pelaksanaan_kegiatan/list_pelaksanaan'),
		type    : 'get',
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
					content.attr('pusatriyal-target', 'includes/manasik/pelaksanaan_manasik/tab_pelaksanaan_manasik/preview-tab-pelaksanaan.html');
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

	$('#input-filter-pelaksanaan').on('keyup', function(){
		// Declare variables
		var input, filter, ul, li, a, i, txtValue;
		input = document.getElementById('input-filter-pelaksanaan');
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