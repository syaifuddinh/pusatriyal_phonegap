function preview_jadwalpengambilan_func(dom){
	var el = $(dom);

	var id = el.find('[name="pr_id"]').val();
	console.log(id);
	for(var i = 0; i < units.length; i++){
		var unit = units[i];
		if(unit.pr_id === parseInt(id)){
			jadwalpengambilan_data = unit;
			jadwalpengambilan_dataglobal(jadwalpengambilan_data);
			console.log('statement if is true');
		}
	}
}

function jadwalpengambilan_dataglobal(json){
	$('#list-jadwalpengambilan').html('');

	$('#nota').text(json.pr_code);
	$('#cabang').val(json.c_name);
	$('#tanggal').val(json.pr_date);
	$('#petugas').val(json.m_name);
	$('#suplier').val(json.s_name);
	$('#total').val(accounting.formatNumber(json.pr_total_net));

	var dom = $('rawcontent').html();
	for(var i = 0;i<json.barang.length;i++){
		var el 	= $(dom);
		barangi = json.barang[i];
		el.find('.btn-header').text(barangi.ir_code + ' - ' + barangi.ir_name);
		el.find('.btn-header').attr('data-target', '#collapse-'+i).attr('aria-controls', 'collapse-'+i);
		el.find('[name="qty[]"]').val(barangi.prdt_qty);
		el.find('[name="satuan[]"]').val(barangi.s_name);
		el.find('[name="nilai[]"]').val(barangi.prdt_valueqty);
		el.find('[name="harga[]"]').val(accounting.formatNumber(barangi.prdt_price));
		el.find('.total_harga').text(accounting.formatNumber(barangi.prdt_total));
		el.find('.datalist-collapse').attr('id', 'collapse-'+i);

		$('#list-jadwalpengambilan').append(el);
	}
}

$.ajax({
	url:url('api/riyal/kulakan/jadwal_pengambilan/get_jadwalpengambilan_android'),
	dataType:'json',
	type:'get',
	success:function(res){
		console.log(res);
		var card = $('.card');
		units = res.data;
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
				content.attr('pusatriyal-target', 'includes/kulakan/jadwal_pengambilan/preview-jadwalpengambilan.html');
				content.attr('pusatriyal-callback', 'preview_jadwalpengambilan_func');
				content.append(
					'<input type="hidden" name="pr_id" value="' + unit.pr_id + '">'
				)
				content.find('.card-title').text( 
					unit.pr_code
				);
				content.find('.card-subtitle').html( 
					'<table cellpadding="5px">'+
						'<tr>'+
							'<th width="30%">Cabang</th>'+
							'<td>'+unit.c_name+'</td>'+
						'</tr>'+
						'<tr>'+
							'<th>Tanggal</th>'+
							'<td>'+unit.pr_date+'</td>'+
						'</tr>'+

						'<tr>'+
							'<th>Petugas</th>'+
							'<td>'+unit.m_name+'</td>'+
						'</tr>'+

						'<tr>'+
							'<th>Total Harga</th>'+
							'<td>'+accounting.formatNumber(unit.pr_total_net)+'</td>'+
						'</tr>'+
					'</table>'
				);
				content.find('.card-info-first').text( 
					'Status : '+
					unit.pr_status
				);
				content.find('.card-info-first').removeClass('badge-primary').addClass('badge-success');
				

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
})