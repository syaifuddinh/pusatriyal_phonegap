$('#btn-simpan').click(function(){

	var form = $('#pembayaran-form').serialize();
	var tagihan_hidden, dibayar;
	dibayar = $('#dibayar').val();
	tagihan_hidden = $('[name="tagihan"]');

	console.log(form);

	pengurangan = parseInt(dibayar) - parseInt(tagihan_hidden.val());
	if(pengurangan >= 0){
		console.log('ckup');
		$.ajax({
			url:url('api/marketing/manasik/penjualan_manasik/bayar'),
			type:'get',
			data:form,
			success:function(resp){
				iziToast.success({
					title:'Sukses',
					message:'Pembayaran berhasil diproses'
				});
				Routing.load_page('includes/manasik/penjualan_manasik/tab_pembayaran/index-pembayaran.html');
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
	} else {
		iziToast.warning({
			title:'Peringatan!',
			message:'Pembayaran masih kurang'
		});
	}
});

$('.input-number').maskMoney({
	thousands:',',
	decimal:'.',
	precision:0
});

$('#dibayar').on('keyup blur', function(){
	var ini, tagihan, tagihan_hidden, kembalian_hidden, kembalian, pengurangan, dibayar;
	ini = $(this);
	tagihan = $('#tagihan');
	tagihan_hidden = $('[name="tagihan"]');
	kembalian = $('#kembalian');
	kembalian_hidden = $('[name="kembalian"]');

	dibayar = ini.val().replace(/[^0-9\-]+/g,"");
	console.log(dibayar);

	pengurangan = parseInt(dibayar) - parseInt(tagihan_hidden.val());
	// pengurangan = Math.abs(pengurangan);
	if(pengurangan > 0){
		kembalian_hidden.val(pengurangan);
		kembalian.val(accounting.formatNumber(pengurangan, 0, '.', ','));
	}else{
		kembalian.val(accounting.formatNumber(0));
	}
	console.log(pengurangan);

});