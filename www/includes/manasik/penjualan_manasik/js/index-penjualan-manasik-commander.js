$(document).ready(function(){
	$('#kode_pelaksanaan_manasik').select2({
          placeholder: "Pilih Kode Pelaksanaan Manasik",
          ajax: {
            url: url('api/marketing/manasik/penjualan_manasik/getKodePelaksanaan'),
            dataType: 'json',
            data: function (params) {
              return {
                  keyword: $.trim(params.term),
              };
            },
            processResults: function (res) {
            	if(res.length > 0) {
            		for(x = 0;x < res.length;x++) {
            			
        				res[x]['id'] = res[x].me_id;
        				res[x]['text'] = res[x].me_code;
            		}
            	}
            	console.log(res);
                return {
                    results: res
                };
            },
            cache: true
          }, 
    }).change(function(){
    	var ini, option, kode_pelaksanaan, info;
    	ini = $(this);
    	option = $('option:selected', this);

    	kode_pelaksanaan = ini.val();
    	info = option.text();

    	localStorage.setItem('kode_pelaksanaan', kode_pelaksanaan);
    	localStorage.setItem('info_kode_pelaksanaan', info);
    	console.log(kode_pelaksanaan);
    	console.log(localStorage.getItem('kode_pelaksanaan'));

    	$('#info_kode').text(info);
    });
    var info, kode;
    info = localStorage.getItem('info_kode_pelaksanaan');
    kode = localStorage.getItem('kode_pelaksanaan');

    if(info){
    	$('#div_select').append('<span id="info_kode" class="badge badge-pill badge-secondary">'+info+'</span>');
    } else {
    	$('#div_select').append('<span id="info_kode" class="badge badge-pill badge-info">Pilih Kode Pelaksanaan terlebih dahulu</span>');
    }

})