$('#btn-hapus').click(function(){
	var id = $('#sm_id').val();
	iziToast.show({
		theme: 'dark',
		icon: 'icon-person',

		// title: '(' + nama + ')',
		message: 'Apakah anda yakin ingin menghapus data ini ?',
		position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
		progressBarColor: 'rgb(0, 255, 184)',
		buttons: [
		['<button class="btn btn-danger"><b>YES</b></button>', function (instance, toast) {
			instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
			$.ajax({
				type: 'get',
				data: {id},
				url: url('api/marketing/manasik/penjualan_manasik/hapus'),
				success: function (response) {
					if(response.status == 'berhasil') {
						iziToast.destroy();
						iziToast.info({
							message: 'Data berhasil dihapus !',
							position: 'topRight'
						});
						Routing.load_routing('includes/manasik/penjualan_manasik/tab_penjualan/index-penjualan.html')
					} else {
						iziToast.warning({
							title: 'ERROR',
							message: 'ERROR, hubungi pengembang !'
						});
					}
				},
				error: function(e) {
					iziToast.warning({
						title: 'ERROR',
						message: 'ERROR, hubungi pengembang !'
					});
				}
			});
		}, true],
		['<button>NO</button>', function (instance, toast) {
			instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
		}],
		],
		onClosing: function(instance, toast, closedBy){
		// console.info('Closing | closedBy: ' + closedBy);
		},
		onClosed: function(instance, toast, closedBy){
		// console.info('Closed | closedBy: ' + closedBy);
		}
	});	
})
