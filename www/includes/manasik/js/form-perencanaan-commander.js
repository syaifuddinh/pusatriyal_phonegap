function insert_perencanaan() {
	var formdata = $('form').serialize();
	$.ajax({
	      url: url('marketing/manasik/perencanaan/simpan_perencanaan'),
	      type    : 'get',
	      data : formdata,
	      success : function(resp){
	      	var card = $('.card');
	        var units = resp.data;
	        var unit, rawcontent, content;
	        if(units.length > 0) {
	        	rawcontent = $('rawcontent.datalist').html();
	        	for(x = 0;x < units.length;x++) {
	        		unit = units[x];
	        		content = $(rawcontent);
	        		content.find('.card-title').text( 
	        			unit.mp_code
	        		);
	        		content.find('.card-subtitle').text( 
	        			unit.mp_place
	        		);
	        		content.find('.card-info-first').text( 
	        			unit.tanggal
	        		);
	        		content.find('.card-info-second').text( 
	        			unit.status
	        		);
	        	}
	        }
	        else {
	        	card.html('<div class="card-body"><h4 class="card-title">Tidak Ada Data Yang Ditampilkan</h4></div>')
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
}

function validate_form()
  {
    var message ="";
    if ($('#nota').val() == "") {
      message = "Nota masih kosong";
    }
    else if ($('#tgl_kegiatan').val() == "") {
      message = "Tanggal kegiatan masih kosong";
    }
    else if ($('#tempat_kegiatan').val() == "") {
      message = "Tempat kegiatan masih kosong";
    }
    else if ($('#pic').val() == "") {
      message = "PIC masih kosong";
    }
    else if ($('#kegiatan').val() == "") {
      message = "Kegiatan masih kosong";
    }
    else if ($('#pet_1').val() == "") {
      message = "Petugas kegiatan 1 masih kosong";
    }
    else if ($('#pet_2').val() == "") {
      message = "Petugas kegiatan 2 masih kosong";
    }
    else if ($('#pet_3').val() == "") {
      message = "Petugas kegiatan 3 masih kosong";
    }

    if (message != "") {
      iziToast.warning({
        title: 'Perhatian',
        position: 'topRight',
        message: message,
      });
      return false;
    }
    else {
    	return true;
    }
  }
$(document).ready(function(){
  $('#_token').val( csrf_token );
  // $('#tgl_kegiatan').datepicker({
  // 	format : 'dd-mm-yyyy'
  // });
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
});