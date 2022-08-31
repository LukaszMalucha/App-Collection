
$('.dropdown-trigger').dropdown();


$(".alert-user").delay(3000).fadeOut(400, function() {
    $(this).alert('close');
});




$(document).ready(function() {

    $('.sidenav').sidenav();

    $('.modal').modal();

    $('#closeModal').click(function(){
        $('.modal').closeModal();
    });

    $('.blockMining').on('click', function(){
        $.ajax({
                    type : 'POST',
                    url : 'https://compilation.mycaprover.toutf.com/blockchain/'
        })
        .done(function(data) {

            if (data.transactions.length >= 2){
                var transaction1 = data.transactions[0]['sender'] + ' sends ' + data.transactions[0]['amount'] + ' coins to ' + data.transactions[0]['receiver'];
                var transaction2 = data.transactions[1]['sender'] + ' sends ' + data.transactions[1]['amount'] + ' coins to ' + data.transactions[1]['receiver'];
            }

            else if (data.transactions.length == 1) {
                var transaction1 = data.transactions[0]['sender'] + ' sends ' + data.transactions[0]['amount'] + ' coins to ' + data.transactions[0]['receiver'];
                var transaction2 = "" ;

            }


            else {
                var transaction1 = "";
                var transaction2 = "";
            }

            $('#blockIndex').text("Block #" + data.index);
            $('#proofOfWork').text(data.proof);
            $('#HashNumber').text(data.previous_hash);
            $('#blockDate').text(data.timestamp_date);
            $('#blockTime').text(data.timestamp_time);
            $('#transaction1').text(transaction1);
            $('#transaction2').text(transaction2);

            $('#minedBlock').fadeOut(300).fadeIn(300);
            $("#rowBlockchain").prepend('<div class="col s12 m3 plain-element">' +
                                        '<div class="card card-block">' +
                                         ' <div class="card-content">' +
                                            '<span class="card-title">'  + "Block #" + data.index +  '</span>' +
                                            '<table>' +
                                              '<tr>' +
                                                '<td class="field-label">Proof of Work:</td>' +
                                                '<td>' + data.proof  + '</td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td class="field-label">Mined at: </td>' +
                                                '<td>'+ data.timestamp_date  + '</td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td class="field-label">Time:</td>' +
                                                '<td>'  + data.timestamp_time  +  '</td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td class="field-label">Previous Hash:</td>' +
                                                '<td>' + data.previous_hash +  '</td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td class="field-label">Transactions:</td>' +
                                              '</tr>' +
                                            '</table>' +
                                            '<div class="row plain-element row-transactions">' +
                                              '<p class="transaction" id="transaction1">' + transaction1 +  '</p>' +
                                              '<p class="transaction" id="transaction2">' + transaction2 + '</p>' +
                                            '</div>' +
                                          '</div>' +
                                        '</div>');
            });

    });

    $('.validationCheck').on('click', function(){
        $.ajax({
                    type : 'GET',
                    url : 'https://compilation.mycaprover.toutf.com/blockchain/validation-check'
        })
        .done(function(data) {
            if (data.error) {
                $('#messageError').text(data.message + '. Current length: ' + data.length).show().fadeOut(3000);
                $('#messageAlert').hide();

            }
            else {
                $('#messageAlert').text(data.message + '. Current length: ' + data.length).show().fadeOut(3000);
                $('#messageError').hide();

            }
        });

    });

    $('.resetChain').on('click', function(){
        $.ajax({
                    type : 'POST',
                    url : 'https://compilation.mycaprover.toutf.com/blockchain/reset'
        })
        .done(function(data) {
            if (data.error) {
                $('#messageError').text(data.message + '. Current length: ' + data.length).show().fadeOut(3000);
                $('#messageAlert').hide();

            }
            else {
                $('#messageAlert').text(data.message + '. Current length: 1' ).show().fadeOut(3000);
                $('#messageError').hide();
                $("#rowBlockchain").empty();
                         $("#rowBlockchain").prepend('<div class="col s6 m3 plain-element">' +
                                        '<div class="card card-block">' +
                                         ' <div class="card-content">' +
                                            '<span class="card-title">'  + "Genesis Block" +  '</span>' +
                                            '<table>' +
                                              '<tr>' +
                                                '<td class="field-label">Proof of Work:</td>' +
                                                '<td>1</td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td class="field-label">Mined at: </td>' +
                                                '<td>2009-01-09</td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td class="field-label">Time:</td>' +
                                                '<td>02:54:25.275350</td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td class="field-label" >Previous Hash:</td>' +
                                                '<td id="HashNumber">0</td>' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td class="field-label">Transactions:</td>' +
                                              '</tr>' +
                                            '</table>' +
                                            '<div class="row plain-element row-transactions">' +
                                              '<p class="transaction"></p>' +
                                              '<p class="transaction"></p>' +
                                            '</div>' +
                                          '</div>' +
                                        '</div>')
            }

        });

    });

    $('#formTransaction').on('submit', function(event){
        $.ajax({
                data : {
                sender : $('#sender').val(),
                receiver : $('#receiver').val(),
                amount : $('#amount').val()
                },
                type : 'POST',
                url : 'https://compilation.mycaprover.toutf.com/blockchain/transaction'

        })

        .done(function(data){
            $('#messageAlert').text(data.message).show().fadeOut(3000);
            $('#messageError').hide();
        });
        $('.modal').modal();
        $('body').css({
            overflow: 'visible'
        });
        event.preventDefault();
    });

    $('#downloadICO').click(function(e) {
        e.preventDefault();
        window.location.href = 'resources/leancoin_ico/leancoin_ico.sol';
    });
});






