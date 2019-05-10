$('#btn-simpan').click(function(){
	$.ajax({
		url:url('api/master/customer/simpan_customer'),
		type:'post',
		data:$('#customer-form').serialize(),
		success:function(res){
			if (res.status === "berhasil") {
				iziToast.success({
					title:'Sukses!',
					message:'Data berhasil disimpan!'
				});
			Routing.load_page('includes/penjualan/customer/index-customer.html');
			} else if(res.status === 'gagal'){
				iziToast.error({
					title:'Gagal!',
					message:'Data gagal disimpan!'
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
})

$(document).ready(function(){
	$.ajax({
		url:url('api/master/customer/get_groupcustomer'),
		type:'get',
		success:function(res){
			console.log(res);
			$('#group').html('');
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

