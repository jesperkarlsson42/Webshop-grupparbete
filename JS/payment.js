$(function () {
    
    $('#payment-btn').on('click', function(){
        let fname = $('#form-fname').val();
        let lname = $('#form-lname').val();
        let cardNumber = $('#cardNumber').val();
        let month = $('#month').val();
        let year = $('#year').val();
        let cvc = $('#cvc').val();

        if (fname.length <3 || fname == '') {
            $('#form-fname').addClass('errorFirstName');
            console.log('funkar inte');
        }
        
        if (lname.length <3 || lname == '') {
            $('#form-lname').addClass('errorLastName');
            console.log('funkar inte');
        }

        if (cardNumber.length < 16 || cardNumber == '' || cardNumber.length > 16) {
            $('#cardNumber').addClass('errorCardNumber');
            console.log('funkar inte');
        }
        if (month.length < 2 || month.length > 2 || month > 12) {
            $('#month').addClass('errorCardNumber');
            console.log('funkar inte');
        }
        if (year.length < 2 || year.length > 2 || year < 20) {
            $('#year').addClass('errorCardNumber');
            console.log('funkar inte');
        }

        if (cvc.length < 3 || cvc.length > 3) {
            $('#cvc').addClass('errorCardNumber');
            console.log('funkar inte');
        }

        else {

        }
    })

}); 