$('#btn-update').click(function(){
	iziToast.question({
		timeout:false,
	    close: false,
	    overlayClose:true,
	    overlay: true,
	    displayMode: 'once',
	    id: 'question',
	    zindex: 999,
	    title: 'Konfirmasi!',
	    message: 'Apa anda yakin mau menyimpan data ini?',
	    position: 'center',
	    buttons: [
	        ['<button class="w-100 mt-3"><b>YES</b></button>', function (instance, toast) {
	 			$.ajax({
					url:url('api/master/customer/update_customer'),
					data:$('#customer-form').serialize(),
					type:'post',
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

$(document).ready(function(){
	$.ajax({
		url:url('api/master/customer/get_groupcustomer'),
		type:'get',
		dataType:'json',
		success:function(res){
			console.log(res);
			var datas;
			for(var i =0; i<res.data.length;i++){
				datas = res.data[i];
				$('#group').append(
					'<option value="'+ datas.g_id +'">'+datas.g_name+'</option>'
					);
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

	$('#group').select2();
})
