$('#idcus').select2();
$('#barang').select2();
$('#session').val(localStorage.getItem('kode_pelaksanaan'));
$('#namapetugas').val(localStorage.getItem('m_name'));
$('#idpetugas').val(localStorage.getItem('m_id'));

$.ajax({
	url:url('api/marketing/manasik/penjualan_manasik/tambah_penjualan_manasik_android'),
	type:'get',
	dataType:'json',
	data:{
		sessioncode:localStorage.getItem('kode_pelaksanaan')
	},
	success:function(res){
		console.log(res);
		$('#idcus').html('');
		$('#barang').html('');
		customer = res.customer;
		barang = res.barang;
		var dataexecution = res.dataexecution;
		$('#barang').append('<option value="">--Pilih Barang--</option>');
		$('#idcus').append('<option value="">--Pilih Customer--</option>');

		for(var i =0; i<barang.length;i++){
			var optioni = barang[i];
			$('#barang').append('<option value="'+ optioni.ir_id +'">'+ optioni.ir_name +'</option>');
		}

		for(var j=0;j<customer.length;j++){
			var optionj = customer[j];
			$('#idcus').append('<option value="'+ optionj.c_id +'" data-alamat="'+ optionj.c_address +'" data-hp="'+ optionj.c_hp +'">'+ optionj.c_code +' - '+ optionj.c_name +'</option>');
		}

		$('#kodepelaksanaan').val(dataexecution.me_code);
		$('#marketing').val(dataexecution.me_pic);
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

$('#idcus').change(function(){
	var data_alamat, data_hp;
	data_hp = $('option:selected', this).data('hp');
	console.log(data_hp);
	data_alamat = $('option:selected', this).data('alamat');
	console.log(data_alamat);

	$('#alamat').val(data_alamat);
	$('#nohp').val(data_hp);
});