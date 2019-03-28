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
    	var ini;
    	ini = $(this);

    	kode_pelaksanaan = ini.val();

    	localStorage.setItem('kode_pelaksanaan', kode_pelaksanaan);
    	console.log(kode_pelaksanaan);
    	console.log(localStorage.getItem('kode_pelaksanaan'));
    });


})