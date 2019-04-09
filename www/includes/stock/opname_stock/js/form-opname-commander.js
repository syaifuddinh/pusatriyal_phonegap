var counter_strike__battefield = 0;

$('#item').html('');

$('#btn-append').click(function(){
	var item = $('#item').val();
	var itemx = $('[name="item_id[]"]');
		for(var f = 0; f <= itemx.length; f++){
			if(item === itemx.eq(f).val()){
				iziToast.error({
					title:'Gagal!',
					message:'Data sudah ada di list'
				});
				return false;
			} 
		}

		$('#form-list-item').append(
					'<div class="accordion">'+
				        '<div class="card">'+
				          '<div class="card-header bg-success header-collapse p-0" id="header-'+ counter_strike__battefield +'">'+
				            '<h5 class="mb-0">'+
				              '<button class="btn btn-link btn-block btn-header text-white collapsed" type="button" data-toggle="collapse" data-target="#collapse-'+ counter_strike__battefield +'" aria-expanded="true" aria-controls="collapse-'+ counter_strike__battefield +'">'+
				                $('#item option:selected').text() + 
				                '<input type="hidden" name="item_id[]" value="'+ $('#item').val() +'" readonly>'+
				                '<input type="hidden" name="gudang[]" value="'+ $('#gudang').val() +'" readonly>'+
				                '<input type="hidden" name="tgl[]" value="'+  $('#tgl').val() +'" readonly>'+
				              '</button>'+
				            '</h5>'+
				          '</div>'+

				          '<div id="collapse-'+ counter_strike__battefield +'" class="collapse datalist-collapse" aria-labelledby="header-'+ counter_strike__battefield +'" data-parent="#form-list-item">'+
				            '<div class="card">'+
				              '<div class="card-body card-forlist p-3">'+

				                '<table class="w-100 table-accordion">'+
				                  '<tr>'+
				                    '<th>Qty Sistem</th>'+
				                    '<td>'+
				                      '<div class="input-group">'+
				                        '<input type="text" readonly="" class="form-control" name="qty_sistem[]" value="'+ $('#qty_sistem').val() +'">'+
				                        '<div class="input-group-append">'+
				                          '<span class="input-group-text">Lembar</span>'+
				                        '</div>'+
				                      '</div>'+
				                    '</td>'+
				                  '</tr>'+
				                  '<tr>'+
				                    '<th>Satuan</th>'+
				                    '<td><input type="text" readonly="" class="form-control" name="satuan[]" value="'+ $('#name_satuan').val() +'"></td>'+
				                  '</tr>'+
				                  '<tr>'+
				                    '<th>Qty Real</th>'+
				                    '<td>'+
				                      '<div class="input-group">'+
				                        '<input type="number" class="form-control" name="qty_real[]" value="'+ $('#qty_real').val() +'"">'+
				                        '<div class="input-group-append">'+
				                          '<span class="input-group-text">Lembar</span>'+
				                        '</div>'+
				                      '</div>'+
				                    '</td>'+
				                  '</tr>'+
				                '</table>'+

				              '</div>'+
				              '<div class="card-footer">'+
				                '<small for="opname_dt[]">Opname</small>'+
				                '<select class="" id="opname_dt" name="opname_dt[]">'+
				                  '<option selected="" value="N">-</option>'+
				                  '<option value="H">Hilang</option>'+
				                  '<option value="R">Rusak</option>'+
				                '</select>'+
				                '<button class="btn btn-danger btn-sm btn-hapus pull-right btn-hapus-accordion" type="button"><i class="fa fa-trash-o"></i> Hapus</button>'+
				              '</div>'+
				              ''+
				            '</div>'+
				          '</div>'+
				        '</div>'+
				    '</div>'
					);

		counter_strike__battefield++;

		$('#item').prop('selectedIndex', 0).trigger('change');
		$('#opname_detail').val('');
		$('#name_satuan').val('');
		$('#nama_item').val('');
		$('#qty_sistem').val('');
		$('#qty_real').val('');
		$('#item').select2('open');
});

$('#form-list-item').on('click', '.btn-hapus-accordion', function(){
	$(this).parents('.accordion').remove();
});

$('#tgl').datepicker({
	format:'dd-mm-yyyy'

}).datepicker('setDate', new Date());

$('#tgl').change(function(){
	$('[name="tgl[]"]').val($(this).val());
});
$('#item').select2();



$.ajax({
	url:url('api/riyal/stock/opname_stock/get_gudang'),
	type:'get',
	dataType:'json',
	success:function(res){
		$('#pilih_gudang').html('');

		var datax = res.data;
		console.log(datax);
		appendx = '<option value="">---Pilih Gudang---</option>';
		$('#pilih_gudang').append(appendx);

		for(var z = 0;z<datax.length;z++){
			var gudang = datax[z];
			var appends = '<option value="'+gudang.p_id+'">'+gudang.p_gudang+'</option>';
			$('#pilih_gudang').append(appends);
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

$.ajax({
	url:url('api/riyal/stock/opname_stock/GetMaxOrCode'),
	type:'get',
	success:function(res){
		console.log(res);
		$('#kode_opname').val(res);
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

$('#pilih_gudang').change(function(){
	$.ajax({
		type: 'get',
		url: url('api/riyal/stock/opname_stock/get_items/' + $('#pilih_gudang').val()),
		success: function(data) {
			$('#item').empty();
			$("#item").append('<option value="" selected="">-- Pilih Item --</option>');
			$.each(data.items, function(key, val) {
				$("#item").append('<option value="'+ val.ir_id +'" data-nama_item="'+ val.ir_name +'"  data-qty_sistem="'+ val.sr_qty +'" data-name_satuan="'+ val.s_name +'">'+ val.ir_name +'</option>');
			});
			$('#item').focus();
			$('#item').select2('open');
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
	$('#gudang').val($(this).val());
});

$('#item').on('select2:select', function(e) {
	var opt_selected = $(this).find('option:selected');
	var qty_sistem = opt_selected.data('qty_sistem');
	// var opname_detail = opt_selected.data('opname_detail');
	var name_satuan = opt_selected.data('name_satuan');
	var nama_item = opt_selected.data('nama_item');
	// console.log(qty_sistem);
	if (qty_sistem == null) {
		$('#qty_sistem').val(0);
	} else {
		$('#qty_sistem').val(qty_sistem);
	}
	// $('#opname_detail').val(opname_detail);
	$('#name_satuan').val(name_satuan);
	$('#nama_item').val(nama_item);
	$('#qty_real').focus();
});

$('#btn-simpan').click(function(){
	console.log('btn-simpan clicked');

	var form = $('#opname-form').serialize();
	console.log(form);
	$.ajax({
		url:url('api/riyal/stock/opname_stock/simpan_opname_stock'),
		type:'post',
		dataType:'json',
		data:form,
		success:function(res){
			console.log(res);
			if(res.status === 'berhasil'){
				iziToast.success({
					title:'Sukses!',
					message:'Data berhasil ditambahkan'
				});
				Routing.load_page('icludes/stock/opname_stock/index-opname.html');
			} else if (res.status === 'gagal'){
				iziToast.error({
					title:'Gagal!',
					message:res.message
				});
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

$('#staff').val(localStorage.getItem('m_name'));