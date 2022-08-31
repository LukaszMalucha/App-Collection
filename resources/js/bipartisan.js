
$('.dropdown-trigger').dropdown();


$(".alert").delay(3000).fadeOut(200, function() {
    $(this).alert('close');
});



$(document).ready(function() {

     $('.counter').counterUp({
        delay: 10,
        time: 800
    });

    $('.sidenav').sidenav();

    $('.modal').modal();
});

$(function() {
    $('#upload-file-btn').click(function() {
        var form_data = new FormData($('#upload-file')[0]);
        $('.loader').show();
        $('#dem').hide();
        $('#rep').hide();
        $('#ind').hide();
        $('.card-plot').hide();
        $('.card-text').hide();
        $('.card-counter').hide();
        $.ajax({
            type: 'POST',
            url: 'https://compilation.mycaprover.toutf.com/bipartisan/',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                var data = data;
                $('.card-plot').show();
                $('.card-text').show();
                $('.card-counter').show();
                $('.counter').counterUp({
                    delay: 5,
                    time: 800
                });
                $('#factorDemocrat').text(data.democrat_factor).show();
                $('#factorRepublican').text(data.republican_factor).show();
                $('.loader').hide();
                if (data.label === 'Republican') {
                        $('#rep').show();
                        $('#repComment').text("AI says that you are a " + data.republican_factor + "% Republican with " +
                                    data.democrat_factor + "% blend of democratic views!").show();


                }

                else if (data.label === 'Democrat') {
                        $('#dem').show();
                        $('#demComment').text("AI says that you are a " + data.democrat_factor + "% Democrat with " +
                                    data.republican_factor + "% blend of republican views!").show();

                }
                else if (data.label === 'Independent') {
                        $('#ind').show();
                        $('#indComment').text("AI says that you are an Independent with the balance of "
                        + data.democrat_factor + "% democratic views & "  + data.republican_factor + "% of republican views!" ).show();
                }
                else {
                    $('#error').text(data.error).show();
                            $('#dem').hide();
                            $('#rep').hide();
                            $('#ind').hide();
                            $('.card-text').hide();
                            $('.card-plot').hide();
                            $('.card-counter').hide();

                }

//                $(".card-prediction").delay(3000).fadeOut(1000, function() {
//                            $(this).alert('close');
//                        });

                $("#error").delay(3000).fadeOut(1000, function() {
                            $(this).alert('close');
                        });
                var scx = document.getElementById('democratBar').getContext('2d');
                var democratchart = new Chart(scx, {
                    type: 'bar',
                    data: {
                        labels: ["Democrat"],
                        datasets: [{
                            label: '%',
                            data: [data.democrat_factor],
                            backgroundColor: [
                            '#1404bd',
                            //...
                        ],
                        }]
                    },
                    // Configuration options go here
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: { display: false },
                        title: {
                        fontSize: 16,
                        fontColor: "rgba(0, 0, 0, 0)",
                        display: true,
                        text: ''
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                             xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    fontColor: "rgba(0, 0, 0, 0)",
                                },
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                display: true,
                                ticks: {
                                    fontColor: "rgba(0, 0, 0, 0)",
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZero: true   // minimum value will be 0.
                            }
                        }]
                    }
                    }
                });

                var scx = document.getElementById('republicanBar').getContext('2d');
                var democratchart = new Chart(scx, {
                    type: 'bar',
                    data: {
                        labels: ["Republican"],
                        datasets: [{
                            label: '%',
                            data: [data.republican_factor],
                            backgroundColor: [
                            '#de0100',
                            //...
                        ],
                        }]
                    },
                    // Configuration options go here
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: { display: false },
                        title: {
                        fontSize: 16,
                        fontColor: "rgba(0, 0, 0, 0)",
                        display: true,
                        text: ''
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        options: {
                            tooltips: {
                                 enabled: false
                            }
                        },
                        scales: {
                             xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    fontColor: "rgba(0, 0, 0, 0)",
                                },
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                display: true,
                                ticks: {
                                    fontColor: "rgba(0, 0, 0, 0)",
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    beginAtZero: true   // minimum value will be 0.
                            }
                        }]
                    }
                    }
                });

            },
        });
    });
});
