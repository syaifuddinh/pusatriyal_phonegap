$('#produk').select2();
$('#m_comp_id').val(localStorage.getItem('m_comp_id'));

$.ajax({
    url:url('api/find_m_mem'),
    type:'get',
    success:function(res){
    	$('#employe1').html('');
    	$('#employe2').html('');
    	$('#employe3').html('');
		for(var a=0;a<res.length;a++){
	        $('#employe1').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
	        $('#employe2').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
	        $('#employe3').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
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

  $('#employe1').select2();
  $('#employe2').select2();
  $('#employe3').select2();

$.ajax({
  	url:url('api/marketing/manasik/pelaksanaan_kegiatan/getcode'),
  	type:'get',
  	dataType:'json',
  	success:function(res){
		$('#idplan').html('');  
		$('#idplan').append('<option value="">--Pilih Kode Pelaksanaan--</option>');
  		
  		var data;
  		for(var a = 0; a<res.length; a++){
  			data = res[a];
			$('#idplan').append('<option value="'+ data.mp_id +'">'+ data.mp_code +'</option>');
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

$('#idplan').change(function(){
	$('#produk').html('');

	$.ajax({
		url:url('api/kode_pelaksanaan_terpilih'),
		type:'get',
		dataType:'json',
		data:{
			id:$(this).val()
		},
		success:function(res){
			console.log(res);
			data = res.data;
			item = res.item;
			petugas = res.petugas

			$('#employe1').val(data.mp_employe1).trigger('change');
			$('#employe2').val(data.mp_employe2).trigger('change');
			$('#employe3').val(data.mp_employe3).trigger('change');


			for(var b = 0;b<item.length;b++){
				var barang = item[b];
				var appendx = '<option value="'+ barang.ir_id +'">'+ barang.ir_code +' - '+ barang.ir_name +'</option>';
				$('#produk').append(appendx);
			}

			cekstok();
		}
	})
});

$('#produk').change(function(){
	cekstok();

	$('#qtyenter').focus();
});

function cekstok(){
	var produk = $('#produk').val();
	$.ajax({
		type: 'get',
		data: {produk},
		dataType: 'json',
		url: url('api/marketing/manasik/pelaksanaan_kegiatan/getstok'),
		success : function(response){
			if (response[0] == null) {
				$('#stok').val(0);
				$('#stockenter').val(0);
			} else {
				$('#stok').val(response[0].sr_qty);
				$('#stockenter').val(parseInt(response[0].sr_qty));
			}
		}
	});
}

$('#btn-tambah').click(function(){
	appendlist();
});

$('#qtyenter').keypress(function(e){
	if (e.keyCode === 13 || e.which === 13) {
		appendlist();
	}
});

var counter_strike__battlefield = 0;
function appendlist(){
	var el, dom, iditem, stok, textitem, qtyenter, iditemlist;

	iditem = $('#produk').val();
	stok = $('#stockenter').val();
	qty = $('#qtyenter').val();
	textitem = $('#produk option:selected').text();

	dom = $('rawcontent').html();

	iditemlist = $('[name="iditem[]"]');

	for(var i =0; i<iditemlist.length;i++){
		if(iditem === iditemlist.eq(i).val()){
			iziToast.error({
				title:'Gagal!',
				message:'Barang sudah ada di list!'
			})
			return false;
		}
	}

	el = $(dom);
	el.find('.btn-header').attr('data-target', '#collapse-'+counter_strike__battlefield);
	el.find('.btn-header').attr('aria-controls', 'collapse-'+counter_strike__battlefield);
	el.find('.btn-header').text(iditem+ ' - ' + textitem);
	el.find('.datalist-collapse').attr('id', 'collapse-'+counter_strike__battlefield);

	el.find('[name="qty[]"]').val(qty);
	el.find('[name="stok[]"]').val(stok);
	el.find('[name="iditem[]"]').val(iditem);

	$('#div-produk-dibawa').append(el);
	counter_strike__battlefield++;

	$('#produk').prop('selectedIndex', 0).trigger('change');
	$('#qtyenter').val(0);
	cekstok();
	$('#produk').select2('open');
}

$('#div-produk-dibawa').on('click', '.btn-hapus-accordion', function(){

	$(this).parents('.accordion').remove();

});

$('#btn-simpan').click(function(){
	
	$.ajax({
		type: 'get',
		data: $('#pelaksanaan-form').serialize()+'&'+$('#list-pelaksanaan-form').serialize(),
		dataType: 'json',
		url: url('api/marketing/manasik/pelaksanaan_kegiatan/simpan_pelaksanaan_android'),
		success : function(response){
			if (response.status == 'berhasil') {
				iziToast.success({
					title : "Sukses!",
					message : "<i class='fa fa-clock-o'></i> <i>Berhasil Disimpan!</i>"
					
				});
				
			} else {
				iziToast.error({
					title : "Gagal!",
					message : "<i class='fa fa-clock-o'></i> <i>Gagal Disimpan</i>"
					
				});
			}
		}
	});
})