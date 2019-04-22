$('#btn-approve').click(function(){
	iziToast.question({
		timeout:false,
	    close: false,
	    overlayClose:true,
	    overlay: true,
	    displayMode: 'once',
	    id: 'question',
	    zindex: 999,
	    title: 'Konfirmasi!',
	    message: 'Apa anda yakin mau menyetujui data penjualan ini?',
	    position: 'center',
	    buttons: [
	        ['<button class="w-100 mt-3"><b>YES</b></button>', function (instance, toast) {
	 			$.ajax({
	 				url:url('api/marketing/manasik/penjualan_manasik/approve'),
	 				data:{
	 					id:$('#sm_id').val()
	 				},
	 				success:function(res){
	 					if(res.status === 'berhasil'){
		 					iziToast.success({
		 						title:'Sukses!',
		 						message:'Data penjualan berhasil disetujui!'
		 					});
		 					Routing.load_page('includes/manasik/penjualan_manasik/tab_serahterima/index-serahterima.html');
		 				} else if(res.status === 'stok kurang'){
		 					iziToast.info({
		 						title:'Info!',
		 						message:'Stok kurang!'
		 					});
		 				} else {
		 					iziToast.error({
		 						title:'Gagal!',
		 						message:'Hubungi pengembang aplikasi!'
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
	            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
	 
	        }, true],
	        ['<button class="w-100 mt-3">NO</button>', function (instance, toast) {
	 
	            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
	 
	        }],
	    ]
	});	
})