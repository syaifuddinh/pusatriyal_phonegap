$('#btn-simpan-status').click(function(){
	var idx = $('#me_id').val();
	var statusx = $('#status').val();
	$.ajax({
		url:url('api/marketing/manasik/pelaksanaan_kegiatan/gantistatus'),
		type:'get',
		dataType:'json',
		data:{
			id:idx,
			status:statusx
		},
		success:function(res){
			if (res.status == 'berhasil') {
				iziToast.success({
					title:'Sukses!',
					message:'<i class="fa fa-clock-o"></i> Data Berhasil disimpan!'
				});
				Routing.load_page('includes/manasik/pelaksanaan_manasik/tab_pelaksanaan_manasik/index-tab-pelaksanaan.html');
			} else if (res.status == 'stock kurang') {
				iziToast.info({
					title:'Info!',
					message:'<i class="fa fa-clock-o"></i> Stok Kurang!'
				});
			} else {
				iziToast.error({
					title:'Gagal!',
					message:'<i class="fa fa-clock-o"></i> Status gagal diubah!'
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
	})
});

$('#btn-hapus').click(function(){
	var idx = $('#me_id').val();

	iziToast.question({
	    timeout: 20000,
	    close: false,
	    overlay: true,
	    displayMode: 'once',
	    id: 'question',
	    zindex: 999,
	    title: 'Peringatan',
	    message: 'Apa anda yakin mau menghapus data ini?',
	    position: 'center',
	    buttons: [
	        ['<button class="w-100"><b>YES</b></button>', function (instance, toast) {
	 			$.ajax({
					url:url('api/marketing/manasik/pelaksanaan_kegiatan/hapus'),
					type:'get',
					dataType:'json',
					data:{
						id:idx
					},
					success:function(res){
						if (res.status === 'berhasil') {
							iziToast.success({
								title:'Sukses!',
								message:'<i class="fa fa-clock-o"></i> Data behasil dihapus'
							})

							Routing.load_page('includes/manasik/pelaksanaan_manasik/tab_pelaksanaan_manasik/index-tab-pelaksanaan.html');
						} else {
							iziToast.error({
								title:'Gagal!',
								message:'<i class="fa fa-clock-o"></i> Data gagal dihapus'
							})
						}
					}
				})

	            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
	 
	        }, true],
	        ['<button class="w-100">NO</button>', function (instance, toast) {
	 
	            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
	 
	        }],
	    ]
	});

				
})

function edit_pelaksanaan_view(dom){
	var el = $(dom);

	var id = el.find('#pelaksanaan_id').val();

	var datas;
	for(var i = 0; i< units.length; i++){
		var datas = units[i];
		if (datas.me_id === parseInt(id)) {
			edit_pelaksanaan_json = datas;
			console.log('statement if is true');
		}

	}
	console.log(edit_pelaksanaan_json);
	$('#id').val(edit_pelaksanaan_json.me_id);
	
}