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