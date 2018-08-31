/**
 * Created by henrique.nascimento on 09/06/2014.
 */
gov.portalbanking.service.fnDataTable = function (tableId, urlRequisicao, columns, columnDefs) {
    var tabela = $(tableId).DataTable({
    	aaSorting: [],// desabilita a ordenação default do primeiro campo da tabela.
        bProcessing: true,
        sAjaxSource: urlRequisicao,
        columns: columns,
        columnDefs: columnDefs,
        "searching": false,
        language: {
            processing:     "Processando...",
            search:         "Pesquisar:",
            lengthMenu:     "Mostrar _MENU_ registros por p&aacute;gina",
            info:           "Mostrar de _START_ at&eacute; _END_ de _TOTAL_ registros",
            infoEmpty:      "Mostrando 0 at&eacute; 0 de 0 registros",
            infoFiltered:   "(Filtrar de _MAX_ total registros)",
            infoPostFix:    "",
            loadingRecords: "Carregando...",
            zeroRecords:    "Nenhum registro encontrado",
            emptyTable:     "Nenhum registro encontrado",
            paginate: {
                first:      "Primeiro",
                previous:   "Anterior",
                next:       "Pr&oacute;ximo",
                last:       "&Uacute;ltimo"
            },
            aria: {
                sortAscending:  ": Ordenar colunas de forma ascendente",
                sortDescending: ": Ordenar colunas de forma descendente"
            }
        },
        fnDrawCallback : function() {
        	var isRoleGrpAut = $("#roleGrpAut").html();
            $(tableId).find("tr").each(function() {
                var id = $(this).find('td:eq(0)').text();
                if(id != "") {
                    $(this).find('td:eq(0)').html('<a href=./' + id + '>' + id + '</a>');
                    /** CONTROLE DE ROLES LDAP*/
                    if(isRoleGrpAut != undefined){
	                    var acoes = $(this).find('.acoesDatatable');
	                    var editarCode = 	"<a href=./" + id + "/editar class=\"glyphicon glyphicon-edit\" title=Editar \/>";
	                    var historicoCode = "<a href=./" + id + "/historico class=\"glyphicon glyphicon-time\" title=Hist&oacute;rico \/>";
	                    acoes.html(editarCode + "&nbsp;&nbsp;" + historicoCode);
	                    
                    }else{
                  	  $(tableId).find("th:eq(5)").remove();
                	  $(tableId).find("tr").each(function() {
                		  $(this).find('td:eq(5)').remove();
                	  });
                    }    
                }
            });
        },
        fnServerData: function ( sSource, aoData, fnCallback ) {
            $.ajax({
                "dataType": 'json',
                "type": "GET",
                "url": sSource,
                "data": aoData,
                "success": fnCallback
            });
        }
    });
};