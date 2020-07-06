$(function () {

    // Pais
    function pais() {
        $.ajax({
            type: 'GET',
            url: 'funcoes.php',
            data: {
                acao: 'pais'
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);

                for (i = 0; i < data.qtd; i++) {
                    $('select[name=pais]').append('<option value="' + data.id[i] + '">' + data.pais[i] + '</option>');
                }
            }
        });
    }
    pais();

    // provincia
    function provincia(pais) {
        $.ajax({
            type: 'GET',
            url: 'funcoes.php',
            data: {
                acao: 'provincia',
                id: pais
            },
            dataType: 'json',
            beforeSend: function () {
                $('select[name=provincia]').html('<option>Carregando...</option>');
            },
            success: function (data) {
                $('select[name=provincia]').html('');
                $('select[name=provincia]').append('<option>Selecione a Provincia</option>');
                for (i = 0; i < data.qtd; i++) {
                    $('select[name=provincia]').append('<option value="' + data.id[i] + '">' + data.provincia[i] + '</option>');
                }
            }
        });
    }


    // Municipio
    function municipio(provincia) {
        $.ajax({
            type: 'GET',
            url: 'funcoes.php',
            data: {
                acao: 'municipio',
                id: provincia
            },
            dataType: 'json',
            beforeSend: function () {
                $('select[name=municipio]').html('<option>Carregando...</option>');
            },
            success: function (data) {
                $('select[name=municipio]').html('');
                $('select[name=municipio]').append('<option>Selecione o municipio</option>');
                for (i = 0; i < data.qtd; i++) {
                    $('select[name=municipio]').append('<option value="' + data.id[i] + '">' + data.municipio[i] + '</option>');
                }
            }
        });
    }

    // Comuna
    function comuna(municipio) {
        $.ajax({
            type: 'GET',
            url: 'funcoes.php',
            data: {
                acao: 'comuna',
                id: municipio
            },
            dataType: 'json',
            beforeSend: function () {
                $('select[name=comuna]').html('<option>Carregando...</option>');
            },
            success: function (data) {
                $('select[name=comuna]').html('');
                $('select[name=comuna]').append('<option>Selecione a comuna</option>');
                for (i = 0; i < data.qtd; i++) {
                    $('select[name=comuna]').append('<option value="' + data.id[i] + '">' + data.comuna[i] + '</option>');
                }
            }
        });
    }

    //

    $('select[name=pais]').change(function () {
        $('select[name=municipio]').val($("select[name=municipio] option:first-child").val());
        var id = $(this).val();
        provincia(id);
    });
      
    //Provincia
    $('select[name=provincia]').change(function () {
        var idProvincia = $(this).val();
        municipio(idProvincia);
    });
        $('select[name=municipio]').change(function () {
        var idMunicipio = $(this).val();
        comuna(idMunicipio);
    });
});