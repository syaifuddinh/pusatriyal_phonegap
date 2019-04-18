
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