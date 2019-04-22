function edit_customer_func(dom){
	el = $(dom);
	var id = el.find('#c_id').val();
	var tes;
	for(var i = 0;i<units.length; i++){
		tes = units[i];
		if (tes.c_id === parseInt(id)) {
			json = tes
			console.log('if statement is true');
		}
	}

	$('#btn-edit').append('<input type="hidden" name="c_id" id="c_id">');
	$('#c_id').val(json.c_id);
	$('#kode').val(json.c_code);
	$('#nama').val(json.c_name);
	
	$('#jenis_customer').val(json.c_type);
	$('#email').val(json.c_email);
	$('#nohp').val(json.c_hp);
	$('#group').val(json.c_pricegroup);
	$('[name="alamat"]').val(json.c_address);

}

$('#btn-hapus').click(function(){
	iziToast.question({
		timeout:false,
	    close: false,
	    overlayClose:true,
	    overlay: true,
	    displayMode: 'once',
	    id: 'question',
	    zindex: 999,
	    title: 'Konfirmasi!',
	    message: 'Apa anda yakin mau menghapus data ini?',
	    position: 'center',
	    buttons: [
	        ['<button class="w-100 mt-3"><b>YES</b></button>', function (instance, toast) {
	 			$.ajax({
					url:url('api/master/customer/hapus_customer'),
					data:{id:$('#c_id').val()},
					type:'get',
					success:function(res){
						if (res.status === "berhasil") {
							iziToast.success({
								title:'Sukses!',
								message:'Data berhasil dihapus!'
							});
						Routing.load_page('includes/penjualan/customer/index-customer.html');
						} else if(res.status === 'gagal'){
							iziToast.error({
								title:'Gagal!',
								message:'Data gagal dihapus!'
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
	            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
	 
	        }, true],
	        ['<button class="w-100 mt-3">NO</button>', function (instance, toast) {
	 
	            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
	 
	        }],
	    ]
	});	
})