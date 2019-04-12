function GET_NOTA(from,to){
	$('#list-for-filter').html('');

	$.ajax({
		url:url('api/produk/penjualan/pos_penjualan/tnota'),
		type:'get',
		dataType:'json',
		data:{
			start:from,
			end:to
		},
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
					if(unit.s_status === 'draft'){
						content.find('.card-info-second').text(
							'Status : Draft'
						);
						content.find('.card-info-second').addClass('badge-success');
						content.attr('pusatriyal-target', 'includes/penjualan/pos_penjualan/preview-penjualan-draft.html');
						content.attr('pusatriyal-callback', 'preview_penjualan_draft_func');
					} else if(unit.s_status === 'final'){
						content.find('.card-info-second').text(
							'Status : Final'
						);
						content.find('.card-info-second').addClass('badge-primary');
						content.attr('pusatriyal-target', 'includes/penjualan/pos_penjualan/preview-penjualan-final.html');
						content.attr('pusatriyal-callback', 'preview_penjualan_final_func');
					}

					content.append(
						'<input type="hidden" name="s_id" value="' + unit.s_id + '">'
					)
					content.find('.card-title').text(
						unit.s_date
					);
					content.find('.card-subtitle').html(
						'<small>' + unit.s_code + '<small><br><small>' + unit.c_name + '</small>'
					);
					content.find('.card-info-first').text(
						'Net : '+
						accounting.formatNumber(unit.s_net)
					);


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

	GET_NOTA();

	console.log('not in document');

var jumlahdt = 0;

function preview_penjualan_draft_func(dom){
	var el = $(dom);
	var idx = el.find('[name="s_id"]').val();

	$('#s_id').val(idx);
	$.ajax({
		type: 'get',
		data: {id:idx, user_comp:localStorage.getItem('m_comp_id')},
		dataType: 'json',
		url: url('api/produk/penjualan/pos_penjualan/editapi'),
		success : function(response){
			unit = response;
			$('#nota').text(response.data.s_code);
			$('#customer').val(response.data.c_name);
			$('#address').val(response.data.c_address);
			$('#cara_pembayaran').val(response.data.s_jenis_bayar.toUpperCase());
			if (response.data.s_jenis_bayar != 'tunai') {
				$('#divjatuhtempo').css('display', '');
				$('#jatuh_tempo').val(moment(response.data.s_duedate).format('DD-MM-YYYY'));
			}
			$('#tanggal_faktur').val(moment(response.data.s_date).format('DD-MM-YYYY'));

			var html = "";
			jumlahdt = response.datadt.length;
			for (var i = 0; i < response.datadt.length; i++) {
				if (response.kemplo[i].i_buy == 'Y') {
					var readonly = '';
				} else if (response.kemplo[i].i_buy == 'N') {
					var readonly = 'readonly';
				}

				html += '<div class="accordion">'+
							'<div class="card">'+
								'<div class="card-header bg-success header-collapse p-0" id="header-'+ i +'">'+
									'<h5 class="mb-0">'+
										'<button class="btn btn-link btn-block btn-header text-white collapsed" type="button" data-toggle="collapse" data-target="#collapse-'+ i +'" aria-expanded="true" aria-controls="collapse-'+ i +'">'+
											response.datadt[i].i_code + ' - ' + response.datadt[i].i_name +
											'<input type="hidden" name="iditem[]" id="iditem'+response.datadt[i].i_id+'" value="'+response.datadt[i].i_id+'" '+readonly+'>'+
										'</button>'+
									'</h5>'+
								'</div>'+
								''+
								'<div id="collapse-'+ i +'" class="collapse datalist-collapse" aria-labelledby="header-'+ i +'" data-parent="#form-list-item">'+
									'<div class="card">'+
										'<div class="card-body card-forlist p-3">'+
										''+
											'<table class="w-100 table-accordion">'+
												'<tr>'+
													'<th>Qty</th>'+
													'<td>'+
														'<div class="input-group">'+
															'<input type="text" readonly onkeyup="qtyinput('+response.datadt[i].i_id+')" id="qtyinput'+response.datadt[i].i_id+'" class="form-control lib_qty_list" name="qty[]" value="'+ response.datadt[i].sd_qty +'">'+
														'</div>'+
													'</td>'+
												'</tr>'+
												'<tr>'+
													'<th>Satuan</th>'+
													'<td><input type="text" readonly="" class="form-control" name="satuan[]" value="'+ response.datadt[i].u_unit +'"></td>'+
												'</tr>'+
												'<tr>'+
													'<th>Harga</th>'+
													'<td>'+
														'<div class="input-group">'+
															'<input type="text" readonly class="form-control lib_harga_list" onkeyup="hargainput('+response.datadt[i].i_id+')" id="hargainput'+response.datadt[i].i_id+'" onkeyup="hargainput('+response.datadt[i].i_id+')" name="harga[]" value="'+ get_currency(parseInt(response.datadt[i].sd_price)) +'"">'+
														'</div>'+
													'</td>'+
												'</tr>'+
												'<tr>'+
													'<th>Disc Percent</th>'+
													'<td>'+
														'<div class="input-group">'+
															'<input type="number" readonly onkeyup="discpercent('+response.datadt[i].i_id+')" class="form-control disc_percent" id="discpercent'+response.datadt[i].i_id+'" name="disc_percent[]" value="">'+
															'<input type="hidden" class="form-control" id="sd_disc_percent_value'+response.datadt[i].i_id+'" name="sd_disc_percent_value[]">'+
														'</div>'+
													'</td>'+
												'</tr>'+
												'<tr>'+
													'<th>Disc Value</th>'+
													'<td>'+
														'<div class="input-group">'+
															'<input type="number" readonly onkeyup="discvalue('+response.datadt[i].i_id+')" id="discvalue'+response.datadt[i].i_id+'" class="form-control disc_value" name="disc_value[]" value="">'+
														'</div>'+
													'</td>'+
												'</tr>'+
												'<tr>'+
													'<th>Total</th>'+
													'<td>'+
														'<div class="input-group">'+
															'<input type="text" readonly class="form-control total" id="totalinput'+response.datadt[i].i_id+'" name="total[]" value="'+ get_currency(parseInt(response.datadt[i].sd_total)) +'">'+
														'</div>'+
													'</td>'+
												'</tr>'+
											'</table>'+
											''+
										'</div>'+
										'<div class="card-footer">'+
											'<button class="btn btn-danger btn-sm btn-hapus pull-right btn-hapus-accordion" type="button"><i class="fa fa-trash-o"></i> Hapus</button>'+
										'</div>'+
										''+
									'</div>'+
								'</div>'+
							'</div>'+
					'</div>';
			}
			$('#form-list-item').html(html);
		}
	});
}

function preview_penjualan_final_func(dom){
	var el =$(dom);

	var idx = el.find('[name="s_id"]').val();

	$.ajax({
		url:url('api/produk/penjualan/pos_penjualan/detail_nota_android'),
		type:'get',
		dataType:'json',
		data:{
			id:idx
		},
		success:function(res){
			console.log(res);
			var data = res.data;
			var dt   = res.datadt;

			$('#nota').text(data.s_code);
			$('#tgl_nota').val(data.s_date);
			$('#customer').val(data.c_name);
			$('#alamat').val(data.c_address);
			if(data.s_jenis_bayar === 'tunai'){
				$('#pembayaran').val('Tunai');
			} else if(data.s_jenis_bayar === 'tempo'){
				$('#pembayaran').val('Tempo');
			}

			var el, dom;
			for(var c = 0; c<dt.length; c++){
				var dom = $('rawcontent.datalist').html();
				var el = $(dom);

				var datax = dt[c];
				var collapse = 'collapse-' + c;
				el.find('.header-collapse').attr('id', 'heading-'+ c);
				el.find('.header-collapse').attr('id', 'header-'+ c);
				el.find('.btn-header').text(datax.i_code + ' - ' + datax.i_name);
				el.find('.btn-header').attr('data-target', '#'+ collapse);
				el.find('.btn-header').attr('aria-controls', 'collapse');
				el.find('.datalist-collapse').attr('id', 'collapse-'+ c);
				el.find('.datalist-collapse').attr('aria-labelledby', 'heading-'+ c);

				el.find('.qty').text(datax.sd_qty);
				el.find('.satuan').text(datax.u_unit);
				el.find('.harga').text(accounting.formatNumber(datax.sd_price));
				el.find('.dis_persen').text(datax.sd_disc_percent);
				el.find('.dis_nilai').text(accounting.formatNumber(datax.sd_disc_value));
				el.find('.total').text(accounting.formatNumber(datax.sd_total));

				console.log(c);
				$('#list-item').append(el);


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

	console.log('document ready');

	$('.input-daterange').datepicker({
		format:'dd-mm-yyyy'
	});

	$('#from, #to').change(function(){
		var from, to;
		from = $('#from').val();
		to = $('#to').val();
		GET_NOTA(from,to);
	});

	$('#btn-reset').click(function(){
		$('#from, #to').val('');
		GET_NOTA();
	});

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
