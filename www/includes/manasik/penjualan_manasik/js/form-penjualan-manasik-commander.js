$('#idcus').select2();
$('#barang').select2();
$('#session').val(localStorage.getItem('kode_pelaksanaan'));
$('#namapetugas').val(localStorage.getItem('m_name'));
$('#idpetugas').val(localStorage.getItem('m_id'));

$('#barang').prop('disabled', true);

function checkEnter(e){
 e = e || event;
 var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
 return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}

document.querySelector('form').onkeypress = checkEnter;

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
			$('#barang').append('<option value="'+ optioni.ir_id +'" data-harga="'+optioni.ir_price+'" data-stok="'+optioni.mdt_sisa+'" data-stokantri="'+optioni.ir_created_at+'" data-nilairiyal="'+optioni.ir_nilaitoreal+'">'+ optioni.ir_name +'</option>');
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
	if($(this).val() === '' || $(this).val() === null){
		$('#barang').prop('disabled', true);
	}
	var data_alamat, data_hp;
	data_hp = $('option:selected', this).data('hp');
	console.log(data_hp);
	data_alamat = $('option:selected', this).data('alamat');
	console.log(data_alamat);

	$('#alamat').val(data_alamat);
	$('#nohp').val(data_hp);

	$('#barang').prop('disabled', false);
	
});

$('#barang').on('select2:select',function(){
	var barang = $(this).val();
	var customer = $('input[name=idcus]').val();
	if (customer === '' || customer === null) {
		$(this).prop('disabled', true);
		
	}
	var marketing = $('input[name=marketing]').val();
	var stok = $('option:selected', this).data('stok');
	var stokantri = $('option:selected', this).data('stokantri');
	console.log(stok);
	console.log(stokantri);
	$.ajax({
		url: url('api/marketing/manasik/penjualan_manasik/getharga'),
		type: 'get',
		data: {
			barang:barang,
			customer:customer, 
			marketing:marketing
		},
		dataType: 'json',
		success : function(response){
			console.log(response);
			if (response.length == undefined) {
				$('#harga').val(0);
			} else {
				$('#harga').val(get_currency(parseInt(response)));
			}

			if (stok == undefined) {
				$('#stok').val(0);
				$('#stokantri').val(0);
			} else {
				$('#stok').val(stok);
				$('#stokantri').val(stokantri);
			}
		},
		complete:function(){
			$('#qtyenter').focus();
		}
	});
});

$('#qtyenter').keypress(function(e){
	if (e.which === 13 || e.keyCode === 13) {
		appendlist();
	}
});

$('#btn-tambah').click(function(){
	appendlist();
});
var counter_strike__battlefield = 0;
function appendlist(){

	var dom = $('rawcontent').html();
	var el = $(dom);

	var nilairiyal = $('#barang option:selected').data('nilairiyal');
	var itemname = $('#barang option:selected').text();
	var itemid = $('#barang').val();
	var harga = $('#harga').val().replace(/[^0-9\-]+/g,"");
	var stok = $('#stok').val()
	var stokantri = $('#stokantri').val();
	var qty = $('#qtyenter').val();
	var total = parseInt(harga) * parseInt(qty) * parseInt(nilairiyal);

	el.find('.btn-header').text(itemname);
	el.find('.btn-header').attr('data-target', '#collapse-'+counter_strike__battlefield);
	el.find('.btn-header').attr('aria-controls', 'collapse-'+counter_strike__battlefield);
	el.find('.datalist-collapse').attr('id', 'collapse-'+counter_strike__battlefield);
	el.find('[name="item[]"]').val(itemname);
	el.find('.nilairiyal').val(nilairiyal);
	el.find('[name="total[]"]').val(total);
	el.find('.total').val(accounting.formatNumber(total));
	el.find('[name="iditem[]"]').val(itemid);
	el.find('[name="harga[]"]').val(harga);
	el.find('.harga').val(accounting.formatNumber(harga));
	el.find('[name="qty[]"]').val(qty);
	el.find('[name="stok[]"]').val(stok);

	$('#div-produk-dibawa').append(el);

	counter_strike__battlefield++;

	$('#barang').prop('selectedIndex',0).trigger('change');
	$('#qtyenter').val('');
	$('#stok').val('');
	$('#stokantri').val('');

	$('#barang').select2('open');

	sm_net();
}

$('#list-penjualan-form').on('click', '.btn-hapus-accordion', function(){
	$(this).parents('.accordion').remove();
});

$('#div-produk-dibawa').on('keyup', '[name="qty[]"]', function(){
	var tuwek = $(this).parents('.accordion');
	var harga = tuwek.find('[name="harga[]"]').val();
	var nilairiyal = tuwek.find('.nilairiyal').val();
	var ini = $(this);
	var total = parseInt(harga) * parseInt(ini.val()) * parseInt(nilairiyal);

	tuwek.find('.total').val(accounting.formatNumber(total));
	tuwek.find('[name="total[]"]').val(total);

	sm_net();
});

function sm_net(){
	total_net = 0;
	$('#div-produk-dibawa [name="total[]"]').each(function(){
		total_net += parseInt($(this).val());
		if ($(this).val() === undefined || isNaN($(this).val()) === true) {
			total_net = 0;
		}
		$('#total_harga').val(accounting.formatNumber(total_net));
		$('[name="sm_net"]').val(total_net);
	});
}

$('#btn-simpan').click(function(){
	$.ajax({
		type: 'get',
		data: $('#penjualan-form').serialize()+'&'+$('#list-penjualan-form').serialize()+'&sessioncode='+localStorage.getItem('kode_pelaksanaan'),
		dataType: 'json',
		url:url('api/marketing/manasik/penjualan_manasik/simpan'),
		success : function(response){
			if (response.status == 'berhasil') {
				iziToast.success({
					title:'Sukses!',
					message:'<i class="fa fa-clock-o"></i> Data berhasil disimpan!',
				});
				$('.badge-antrian').text(response.antrian);
				$('#modal-antrian').modal('show');
			} else {
				iziToast.error({
					title:'Gagal!',
					message:'<i class="fa fa-clock-o"></i> Data gagal disimpan!',
				})
			}

		}
	});
});

$('#modal-antrian').on('hide.bs.modal', function(){
	setTimeout(function(){

		Routing.load_page('includes/manasik/penjualan_manasik/form-penjualan-manasik.html');
	},500);
})

$('#btn-pdf').click(function(){

	var el = $('.badge-antrian').text();

	createPDF(el);
});
function createPDF(dom) {
	/*	
		# cssFile have to be the following: 
		# iOS: www/<css-folder>/<your-file.css>
		# Android: file:///android_asset/www/<css-folder>/<your-file.css>
	*/	 	
	var date = new Date();
	var tanggal = date.getDay();
	var bulan = date.getMonth();
	var year = date.getFullYear();
	var tanggal = tanggal+'-'+bulan+'-'+year;

	  var opts = {
	      // documentSize: "A4",	
	      landscape: "portrait",
	      type: "share",
	      fileName: 'antrian-manasik '+tanggal+'.pdf'
	  }

	 	var html = '<html>'+
		 				'<head>'+
		 					'<link rel="stylesheet" href="file:///android_asset/www/asset/css/alamraya-style.css">'+
		 					'<link rel="stylesheet" href="file:///android_asset/www/node_modules/bootstrap/dist/css/bootstrap.css">'+
						'</head>'+
						'<body>' +
						 	'<div class="div-antrian-pdf text-center">'+
						 		'<h1>No. Antrian :</h1>'+
					 			'<div class="badge-antrian">'+
									dom + 
								'</div>'+
							'</div>'+
						'</body>'+
					'</html>';
	 
	  pdf.fromData(html,
	          opts)
	      .then(progressHide)
	      .catch(progressHide);
}