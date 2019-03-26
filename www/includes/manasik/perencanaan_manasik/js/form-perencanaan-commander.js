
function edit_perencanaan_view(dom){
  el = $(dom);
  var id = el.find('#mp_id').val();

  var coba, ujicoba;
  for (var j = 0; j < units.length; j++) {
    coba = units[j];
    if(coba.mp_id === id){
      ujicoba = coba;
    }
  }

  $.ajax({
    url:url('api/find_m_mem'),
    type:'get',
    success:function(res){
      for(var a=0;a<res.length;a++){
        $('#pic').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
        $('#petugas1').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
        $('#petugas2').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
        $('#petugas3').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
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
    },
    complete:function(){
     
     
     
      $('#pic').val(ujicoba.mp_pic).trigger('change');
      
      $('#petugas1').val(ujicoba.emp_1.m_id).trigger('change');
      $('#petugas2').val(ujicoba.emp_2.m_id).trigger('change');
      $('#petugas3').val(ujicoba.emp_3.m_id).trigger('change');
     
    }
  });
  $('#nota').val(ujicoba.mp_code);
  $('#tgl_perencanaan32').val(ujicoba.mp_date);
  $('#tempat').val(ujicoba.mp_place);
  $('#aktifitas').val(ujicoba.mp_plan_activity);
  $('#mp_id').val(ujicoba.mp_id);
  console.log(ujicoba);
    
}

function insert_perencanaan() {
	var formdata = $('form').serialize();
	$.ajax({
	      url: url('api/marketing/manasik/perencanaan/simpan_perencanaan'),
	      type    : 'post',
	      data : formdata,
	      success : function(resp){
	      	var card = $('.card');
	        var unit, rawcontent, content;

	        console.log(resp);
	        if(resp.status === "gagal"){
	        	pesan = "";
	        	for (i =0; i < resp.message.errorInfo.length; i++) {
	        		pesan += resp.message.errorInfo[i] + ' ';
	        	}

	        	iziToast.info({
	        		title:resp.status,
	        		message: pesan
	        	});
	        	return false;
	        }
	        iziToast.success({
	        	title:'Sukses',
	        	message:'Nota ' + resp.nota + ' ' + resp.status +' ditambahkan!'
	        });

          Routing.load_page('includes/manasik/perencanaan_manasik/index-perencanaan.html');
	        
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
}

function validate_form()
  {
    var message =[];
    // if ($('#nota').val() == "") {
    //   message.push("Nota masih kosong");
    // }
    if ($('#tgl_perencanaan').val() == "") {
      message.push("Tanggal kegiatan masih kosong");
    }
    if ($('#tempat').val() == "") {
      message.push("Tempat kegiatan masih kosong");
    }
    if ($('#pic').val() == "") {
      message.push("PIC masih kosong");
    }
    if ($('#aktifitas').val() == "") {
      message.push("Kegiatan masih kosong");
    }
    if ($('#petugas1').val() == "") {
      message.push("Petugas kegiatan 1 masih kosong");
    }
    if ($('#petugas2').val() == "") {
      message.push("Petugas kegiatan 2 masih kosong");
    }
    if ($('#petugas3').val() == "") {
      message.push("Petugas kegiatan 3 masih kosong");
    }

    if (message.length != 0) {
    	for(i=0;i<message.length;i++){
			iziToast.warning({
				title: 'Perhatian',
				position: 'topRight',
				message: message[i],
			});
		}
      return false;
    }
    else {
    	return true;
    }
  }
$(document).ready(function(){
  $('#_token').val( csrf_token );
  $('#tgl_perencanaan').datepicker({
  	format : 'dd-mm-yyyy'
  });
  $('#btn_submit').on('click', function() {
    var is_complete = validate_form();
    if(is_complete == true) {
    	insert_perencanaan();
    }
  });

  $(document).on('click', '#btn-hapusperencanaan', function(){
	iziToast.question({
	    timeout: 20000,
	    close: false,
	    overlay: true,
	    displayMode: 'once',
	    id: 'question',
	    zindex: 999,
	    title: 'Perhatian',
	    message: 'Apa Anda yakin mau menghapus data ini?',
	    position: 'center',
	    buttons: [
	        ['<button><b>YES</b></button>', function (instance, toast) {
	        	var mp_id = $('#mp_id').val();
	 
				$.ajax({
			  		url:url('api/marketing/manasik/perencanaan/hapus_perencanaan/' + mp_id),
			  		type:'post',
			  		success:function(e){
			  			iziToast.success({
			  				title:'Sukses!',
			  				message:e.status
			  			})
			            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
			  			Routing.backward();
			  		},
			  		error:function(e){
			  			iziToast.error({
			  				title:'Gagal!',
			  				message:e.message
			  			});
			            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
			  		}
			  	})
	 
	        }, true],
	        ['<button>NO</button>', function (instance, toast) {
	 
	            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
	 
	        }],
	    ]
	});  	
  	
  });

	$("#pic").select2({
          placeholder: "Pilih PIC",
          ajax: {
            url: url('api/find_m_mem'),
            dataType: 'json',
            data: function (params) {
              return {
                  keyword: $.trim(params.term),
              };
            },
            processResults: function (res) {
            	if(res.length > 0) {
            		for(x = 0;x < res.length;x++) {
            			
        				res[x]['id'] = res[x].m_id;
        				res[x]['text'] = res[x].m_name;
            		}
            	}
            	console.log(res);
                return {
                    results: res
                };
            },
            cache: true
          }, 
    });
	$("#petugas1").select2({
          placeholder: "Pilih Petugas 1",
          ajax: {
            url: url('api/find_m_mem'),
            dataType: 'json',
            data: function (params) {
              return {
                  keyword: $.trim(params.term),
              };
            },
            processResults: function (res) {
            	if(res.length > 0) {
            		for(x = 0;x < res.length;x++) {
            			
        				res[x]['id'] = res[x].m_id;
        				res[x]['text'] = res[x].m_name;
            		}
            	}
            	console.log(res);
                return {
                    results: res
                };
            },
            cache: true
          }, 
    });
	$("#petugas2").select2({
          placeholder: "Pilih Petugas 2",
          ajax: {
            url: url('api/find_m_mem'),
            dataType: 'json',
            data: function (params) {
              return {
                  keyword: $.trim(params.term),
              };
            },
            processResults: function (res) {
            	if(res.length > 0) {
            		for(x = 0;x < res.length;x++) {
            			
        				res[x]['id'] = res[x].m_id;
        				res[x]['text'] = res[x].m_name;
            		}
            	}
            	console.log(res);
                return {
                    results: res
                };
            },
            cache: true
          }, 
    });
	$("#petugas3").select2({
          placeholder: "Pilih Petugas 3",
          ajax: {
            url: url('api/find_m_mem'),
            dataType: 'json',
            data: function (params) {
              return {
                  keyword: $.trim(params.term),
              };
            },
            processResults: function (res) {
            	if(res.length > 0) {
            		for(x = 0;x < res.length;x++) {
            			
        				res[x]['id'] = res[x].m_id;
        				res[x]['text'] = res[x].m_name;
            		}
            	}
            	console.log(res);
                return {
                    results: res
                };
            },
            cache: true
          }, 
    });        	

    $.ajax({
    	url:url('api/marketing/manasik/GetMaxNota'),
    	type:'get',
    	success:function(res){
    		// console.log(res);
    		$('#nota').val(res);
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