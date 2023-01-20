function scroll_to_class(element_class, removed_height) {
	var scroll_to = $(element_class).offset().top - removed_height;
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 0);
	}
}

function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps');
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if(direction == 'right') {
		new_value = now_value + ( 100 / number_of_steps );
	}
	else if(direction == 'left') {
		new_value = now_value - ( 100 / number_of_steps );
	}
	progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

$(document).ready(function() {
    // Form
    $('.f1 fieldset:first').fadeIn('slow');
    
    $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    // step selanjutnya (ketika klik tombol selanjutnya)
    $('.f1 .btn-next').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	
    	// validasi form
    	parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
    			// change icons
    			current_active_step.removeClass('active').addClass('activated').next().addClass('active');
    			// progress bar
    			bar_progress(progress_line, 'right');
    			// show next step
	    		$(this).next().fadeIn();
	    		// scroll window to beginning of the form
    			scroll_to_class( $('.f1'), 20 );
	    	});
    	}
    });
    
    // step sbelumnya (ketika klik tombol sebelumnya)
    $('.f1 .btn-previous').on('click', function() {
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	
    	$(this).parents('fieldset').fadeOut(400, function() {
    		// change icons
    		current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
    		// progress bar
    		bar_progress(progress_line, 'left');
    		// show previous step
    		$(this).prev().fadeIn();
    		// scroll window to beginning of the form
			scroll_to_class( $('.f1'), 20 );
    	});
    });
    
    // submit (ketika klik tombol submit diakhir wizard)
    $('.f1').on('submit', function(e) {
    	// validasi form
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    });
});

//form input details
// function renderDate(params){
	
// 	var tableRow = ''
// 	for(var i = 0 ; i < params.length; i++){
// 		tableRow += `
// 		<tr class="border">
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_no}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_hs_code}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_description}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_art_no}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_brand}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_ctn}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_qty}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_unit}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_unit_price}</td>
// 			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${containers[i].container_under}</td>
// 		</tr>
// 		`
// 	}

// 	$('#tBody').html(tableRow)
// }

// var containers = [
// 	{
// 		container_no:1,
// 		container_hs_code:'12ASV',
// 		container_description:'Simple',
// 		container_art_no:'9291808',
// 		container_brand:'vaee',
// 		container_ctn:'evev',
// 		container_qty:'2',
// 		container_unit:'22',
// 		container_unit_price:'21',
// 		container_under:'28%',

// 	},
// 	{
// 		container_no:2,
// 		container_hs_code:'12ASVEEW',
// 		container_description:'Simpless',
// 		container_art_no:'92918328',
// 		container_brand:'vaeeew',
// 		container_ctn:'evevxce',
// 		container_qty:'13',
// 		container_unit:'22',
// 		container_unit_price:'21',
// 		container_under:'30%',
// 	},
	
// ]

// function formValidate(){
// 	var no = $('#no').val()
// 	var hs_code = $ ('#hs_code').val()
// 	var description = $ ('#description').val()
// 	var art_no = $ ('#art_no').val()
// 	var brand = $ ('#brand').val()
// 	var ctn = $ ('#ctn').val()
// 	var qty = $ ('#qty').val()
// 	var unit = $ ('#unit').val()
// 	var unit_price = $ ('#unit_price').val()
// 	var under = $ ('#under').val()

// 	if(no == '' || hs_code == '' || description == '' || art_no == '' || brand == '' || ctn == '' || qty == '' || unit == '' || unit_price == '' || under == ''){
// 		return false
// 	}

// 	return true
// }

// $('.btnAdd').on('click', function(){
// 	var no = $('#no').val()
// 	var hs_code = $ ('#hs_code').val()
// 	var description = $ ('#description').val()
// 	var art_no = $ ('#art_no').val()
// 	var brand = $ ('#brand').val()
// 	var ctn = $ ('#ctn').val()
// 	var qty = $ ('#qty').val()
// 	var unit = $ ('#unit').val()
// 	var unit_price = $ ('#hsunit_price_code').val()
// 	var under = $ ('#under').val()

// 	if(formValidate() === false) {
// 		return alert('Form Tidak Boleh Kosong')
// 	}

// 	var tableRow = `
// 	<tr class="border">
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${no}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${hs_code}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${description}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${art_no}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${brand}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ctn}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${qty}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${unit}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${unit_price}</td>
// 		<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${under}</td>
// 	</tr>
// `

// $('#tBody').append(tableRow)
// resetForm()

	
	
// })



