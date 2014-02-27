(function (global) {
    var GetRateViewModel,
        app = global.app = global.app || {};

    	GetRateViewModel = kendo.data.ObservableObject.extend({
        


        onGetRate:  function () {
            var rates;
            var rates2;
            var fromtextBox = $("#from");
            
            // get the value of the numerictextbox.
            var fromValue = fromtextBox.val();
                
            var toTextBox = $("#to");
            
            // get the value of the numerictextbox.
            var toValue = toTextBox.val();
        // fromtextBox.val(fromtextBox.val() + "1234");
            
            rates2:  new kendo.data.DataSource({
            transport: {
                read: {
                    url:  "http://centralapi.aliasmedia.com:82/api/Customer/GetRate?To=" + toValue +"&From=" + fromValue +"",
                  dataType: "json"
                }
            },
            schema: {
                data: function (data) {
                    return data.Data;
                }
            },
                 type           : "json",
                parameterMap   : function (options) {
                    return JSON.stringify(options);
                }
          });

            var rates3 = new kendo.data.DataSource({
                serverFiltering: true,
                transport      : {
                    read: {
                        type       : "GET",
                        url        : "http://centralapi.aliasmedia.com:82/api/Customer/GetRate?To=" + toValue +"&From=" + fromValue +"",
                        contentType: "application/json; charset=utf-8",
                        dataType   : "json",
                        error      : function (xhr, ajaxOptions, thrownError) {
                            alert("error " + xhr.responseText);
                        }
                    }
                },
                schema         : {
                    data: "Data"
                },
                type           : "json",
                parameterMap   : function (options) {
                    return JSON.stringify(options);
                }
            });
            
              

            $("#rateListView").kendoMobileListView({
                
                dataSource: rates3,
                template: $("#rate-list-template").text()
            });


        },
        
        

    });

    app.getrateService = {
        viewModel: new GetRateViewModel()
    };
})(window);