var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var estadoTarjetaDebito = false;
var estadoTarjetaCredito = false;

var router = express.Router();

function mostrarLog(seccion,objeto){
  var fechaLog = new Date();
  if(objeto === undefined){
    console.log(fechaLog.toLocaleString()+ ": "+ seccion +" - VACIO!")
  }else{
    console.log(fechaLog.toLocaleString()+ ":  "+ seccion +" - " + JSON.stringify(objeto.body));
  }
}

function printObject(o) {
  var out = '';
  for (var p in o) {
    out += p + ': ' + o[p] + '\n';
  }
  return out;
}

// encargado de enviar token para validar sesion.
router.post('/token', function(req, res) {
  mostrarLog("TOKEN",req);
  res.send({
      "scope": "am_application_scope default",
      "token_type": "Bearer",
      "expires_in": 572,
      "access_token": "aeae62ec-4ded-3d55-b443-4f26dfae6058"
  });
});

/**
 * usado por el login para saber si el telefono del usuario esta enrolado ( funcionalidad de llamada)
 * duda , rut numero ??? 
 */
router.post('/ConsultaEnrolado', function(req, res) {
  mostrarLog("ConsultaEnrolado",req);
  res.send({
      "statusCode": "Success",
      "rut": "168392036",
      "nombre": "JAVIER PATRICIO JOFRE LALLEMAND",
      "Dispositivos": {
          "Dispositivo": [
              {
                  "alias": "samsung",
                  "nombreDispositivo": "samsung",
                  "fechaEnrolado": 20180425,
                  "idDispositivo": "355230086345414"
              }
          ]
      }
  });
});

router.post('/login', function(req, res) {
  mostrarLog("LOGIN",req);
  res.send({
      "operationResult": "OK",
      "statusCode": "Success"
  });
});

router.post('/Llamar', function(req, res) {
  mostrarLog("LLAMAR",req);
  res.send({
      "statusCode": 0,
      "response": {
          "body": {
              "IdStatus": 0,
              "IdLlamada": 2292820
          }
      },
      "error": {
          "errorCode": 0,
          "errorDescription": null
      }
  });
});

router.post('/Autenticar', function(req, res) {
  mostrarLog("AUTENTICAR",req);
  res.send({
      statusCode: 0,
      "response": {
          "body": {
              "Autenticar": "13946109"
          }
      },
      "error": {
          "errorCode": 0,
          "errorDescription": null
      }
  });
});

router.post('/EnrolarDispositivo', function(req, res) {
  mostrarLog("ENROLAR_DISPOSITOV",req);
  res.send({
      "statusCode": "Success",
      "codigoRetorno": "000000",
      "glosaRetorno": "ACTUALIZACION REALIZADA"
  });
});

// CREDITO!
router.post('/GetCardData', function(req, res) {
  mostrarLog("GET_CARD_DATA",req);
  var estadoStringCredito = "";
    
  if(estadoTarjetaCredito){
    estadoStringCredito = "1";
  }else{
    estadoStringCredito = "0";
  }

  res.send({
      "statusCode": "Success",
      "idTarjeta": "50608",
      "nombre": "regionsTest",
      "fechaActualizacion": "2018-04-03 11:16:07",
      "estado": estadoStringCredito,
      "estadoPos": "1",
      "estadoAtm": "1",
      "estadoEcom": "1",
      "estadoMoto": "1"
  });
});

router.post('/SetEnabled', function(req, res) {
  mostrarLog("SET ENABLED",req);
  if(estadoTarjetaCredito){
    estadoTarjetaCredito = false;
  }else{
    estadoTarjetaCredito = true;
  }
  console.log("SetEnabled/estadoString " + estadoTarjetaCredito);

  res.send({
         "statusCode": "Success",
         "codigoRetorno": 0,
         "glosaRetorno": "SUCCESS"
  });
});

// DEBITO
router.post('/OnOffCardStatus', function(req, res) {
    mostrarLog("ON OFFF CARD STATUS",req);
    if(estadoTarjetaDebito){
        estadoTarjetaDebito = false;
      }else{
        estadoTarjetaDebito = true;
      }
      console.log("SetEnabled/estadoString " + estadoTarjetaDebito);

    res.send({
         "statusCode": "Success",
         "statusId": 0,
         "statusDescription": "Tarjeta ya posee el estado ON",
         "statusDate": ""
    });
  });

  
router.post('/CheckCardStatus', function(req, res) {
    mostrarLog("CHECK CARD STATUS",req);
    var estadoString = "";
    
    if(estadoTarjetaDebito){
      estadoString = "OFF";
    }else{
      estadoString = "ON";
    }
    console.log("/CheckCardStatus/estadoString " + estadoString);
    res.send({
        "statusCode": "Success",
        "statusDescription": estadoString,
        "statusId": 3095,
        "statusDate": "2018-04-16T17:17:40.000-04:00",
        "channel": "kvz",
        "user": ""
    });
  });

router.post('/ChangePaymentChannels', function(req, res) {
  mostrarLog("CHANGE PAYMENT",req);
  res.send({
         "statusCode" : "Success",
         "codigoRetorno" : 0,
         "glosaRetorno" : "SUCCESS"
  });
});

router.post('/ConsultaNotificaciones', function(req, res) {
  mostrarLog("CONSULTA NOTIFICACIONES ",req);
  res.send({
      "statusCode": "Success",
      "Notificacion": [
          {
              "estadoNotificacion": "1",
              "codigoNotificacion": "TEF",
              "notificacion": "TRANSFERENCIAS ELECTRONICAS",
              "delivery": "002"
          },
          {
              "estadoNotificacion": "1",
              "codigoNotificacion": "TC ",
              "notificacion" : "TRANSACCIONES TARJETA DE CREDITO",
              "delivery": "002"
          },
          {
              "estadoNotificacion": "0",
              "codigoNotificacion": "TD",
              "notificacion": "TRANSACCIONES TARJETA DE DEBITO",
              "delivery": "000"
          },
          {
              "estadoNotificacion": "0",
              "codigoNotificacion": "PAG",
              "notificacion": "TRANSACCIONES DE PAGO",
              "delivery": "000"
          }
      ]
  });
});

router.post('/ConsultaHistorialNotificaciones', function(req, res) {
  mostrarLog("CONSULTA HISTORIAL NOTIFICACIONES ",req);
  res.send({
       "statusCode": "Success",
       "Notificaciones":    [
          {"Notificacion":       {
             "mensajeNotificacion": "Mensaje",
             "fecha": "2014-08-31T00:00:00"
          }},
          {"Notificacion":       {
             "mensajeNotificacion": "Mensaje3",
             "fecha": "2014-08-31T00:00:00"
          }}
       ]
  });
});

router.post('/ConsultaProductosNotificaciones', function(req, res) {
  mostrarLog("CONSULTA PRODUCTOS NOTIFICACIONES",req);
  res.send({
      "statusCode": "Success",
      "flagInicio": "S",
      "tamanoBloque": 122,
      "paginaConsultar": 1,
      "numeroRegistros": "00002",
      "totalPaginas": "00001",
      "ultimoRegistro": "00002",
      "ProductosNotificaciones": [
          {
              "numeroProducto": "000169148101        ",
              "codigoTipoProducto": "E011      ",
              "tipoProducto": "CUENTA CORRIENTE                                  ",
              "glosaProducto": "CTA CTE SIN INTERESES PERSONAS NATURALES PESO     ",
              "estadoNotificacionProducto": 1,
              "montoPesos": 0,
              "montoDolar": 0
          },
          {
              "numeroProducto": "0005897381691481013 ",
              "codigoTipoProducto": "E011      ",
              "tipoProducto": "TARJETA DEBITO",
              "glosaProducto": "CTA CTE SIN INTERESES PERSONAS NATURALES PESO     ",
              "estadoNotificacionProducto": 0,
              "montoPesos": 0,
              "montoDolar": 0
          },
          {
            "numeroProducto": "0005523002200004854",
            "codigoTipoProducto": "T101      ",
            "tipoProducto": "TARJETA CREDITO                                   ",
            "glosaProducto": "MASTER BLACK                                      ",
            "estadoNotificacionProducto": "0",
            "montoPesos": "0.0",
            "montoDolar": "0.0"
        },
        {
          "numeroProducto": "000552300210051MASTERGOLD",
          "codigoTipoProducto": "T101      ",
          "tipoProducto": "TARJETA CREDITO                                   ",
          "glosaProducto": "MASTER GOLD                                      ",
          "estadoNotificacionProducto": "0",
          "montoPesos": "0.0",
          "montoDolar": "0.0"
        }
      ]
  });
});

app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});