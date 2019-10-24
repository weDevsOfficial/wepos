///
///	@file app.js
///
///	@author Ferdi Ladeira
///
///	@brief Application Constructor
///
/// @description
///
///	Main application variable with event handlers and calls to plugins
///

/*
 * This is loaded on the Magento Server in the JavaScripts folder
 * and contains the payment call to the mPress plugin running
 * in the Cordova WebView
 * This will fail if run on a non-cordova webview
 */
var mpress;

    mpress = {
        //
        // Application Initializer
        initialize: function () {
            return true;
        },
        doPayment: function(data) {
            console.log('Incoming mPress Payment Data :' + data.toString());
            
            return new Promise(function(resolve, reject) {
                var jsonResponse =
                    [{
                        ResultCode: "0",
                        ResultDescription: "Success",
                        StatusDescription: "StatusDescription",
                        Transaction: {
                            TransactionIndex: "TransactionIndex"
                        },
                        AuthorisationCode: "AuthorisationCode",
                        PAN: "PAN"
                    }];
                console.log('paySuccess :' + JSON.stringify(jsonResponse));
                console.log('Extract Payment data from :'+data);
                var s = jsonResponse[0]["ResultCode"];
                if (s != 0) {
                    alert("mPress Response: " + jsonResponse[0]['ResultDescription']);
                    resolve (data);
                }
                data['mpress_result'] = jsonResponse;
                //resolve (data);
                // Simulate time
                setTimeout(() => resolve(data), 4000);
            });
        },

        paymentSuccess: function (jsonResponse) {
            var r = JSON.parse(jsonResponse);
            console.log('paySuccess :' + JSON.stringify(r));
            var s = r[0]["ResultCode"];
            if (s != 0) {
                alert("mPress Response: " + r[0]['ResultDescription']);
                return;
            }
            document.getElementById('Mpress_Result_Description').value = r[0]['StatusDescription'];
            document.getElementById('Mpress_Payment_Card_Status').value = r[0]['Status'];
            document.getElementById('Mpress_Transaction_Index').value = r[0]['Transaction']['TransactionIndex'];
            document.getElementById('Mpress_Authorisation_Code').value = r[0]['AuthorisationCode'];
            document.getElementById('Mpress_PAN').value = r[0]['PAN'];
        },
        payFailCallBack: function (err) {
            var r = JSON.parse(err);
            console.log('WC Server mpresspay.js payFailCallBack:' + JSON.stringify(r));
            document.getElementById('Mpress_Result_Description').value = r[0]['ResultDescription'];
            document.getElementById('Mpress_Payment_Card_Status').value = r[0]['status'];
        }
    };

    function callPaymentProcess (data) {
        setTimeout(function(){
            //Do Nothing
        }, 3000);
    };

    /**
     * wraps a promise in a timeout, allowing the promise to reject if not resolve with a specific period of time
     * @param {integer} ms - milliseconds to wait before rejecting promise if not resolved
     * @param {Promise} promise to monitor
     * @Example
     *  promiseTimeout(1000, fetch('https://courseof.life/johndoherty.json'))
     *      .then(function(cvData){
     *          alert(cvData);
     *      })
     *      .catch(function(){
     *          alert('request either failed or timedout');
     *      });
     */
    function promiseTimeout(ms, promise){

        return new Promise(function(resolve, reject){
      
          // create a timeout to reject promise if not resolved
          var timer = setTimeout(function(){
              reject(new Error("Payment Timeout"));
          }, ms);
      
          promise
              .then(function(res){
                  clearTimeout(timer);
                  resolve(res);
              })
              .catch(function(err){
                  clearTimeout(timer);
                  reject(err);
              });
        });
      };

(function(){
	// Include any directives at a top level
	'use strict';
})();
