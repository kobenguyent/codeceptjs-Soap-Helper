[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/peternguyew)

# codeceptjs-Soap-helper

CodeceptJS Soap helper.

NPM package: <https://www.npmjs.com/package/codeceptjs-soap-helper>

## Installation

`npm i codeceptjs-soap-helper --save-dev`

## Configuration

This helper should be added in your codeceptjs config file: `codecept.conf.*`

Example:

```
{
...
   helpers: {
     SoapHelper: {
      require: 'codeceptjs-soap-helper',
      endpoint: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso'
    }
   }
...
}
```

## Usage
- If there is no auto complete for `I` actor, try running `npx codeceptjs def`

```
const I: CodeceptJS.I = inject().I;

Feature('SOAP testing');

Scenario.only('Number conversion service', async () => {
  const res = await I.sendSoapRequest('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso', `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <ListOfContinentsByName xmlns="http://www.oorsprong.org/websamples.countryinfo">
    </ListOfContinentsByName>
  </soap12:Body>
</soap12:Envelope>`)

  I.expectContain(res.data, 'Europe');
});
```

Output

```
Helpers: SOAPHelper, ExpectHelper
Plugins: screenshotOnFail

SOAP testing --
    [1]  Starting recording promises
    Timeouts: 
  Number conversion service
    I send soap request "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso", "<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <ListOfContinentsByName xmlns="http://www.oorsprong.org/websamples.countryinfo">
    </ListOfContinentsByName>
  </soap12:Body>
</soap12:Envelope>"
    › [Request] {"baseURL":"http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso","method":"POST","data":"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap12:Envelope xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n  <soap12:Body>\n    <ListOfContinentsByName xmlns=\"http://www.oorsprong.org/websamples.countryinfo\">\n    </ListOfContinentsByName>\n  </soap12:Body>\n</soap12:Envelope>","headers":{"Content-Type":"text/xml;charset=UTF-8"}}
    › [Response] "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n  <soap:Body>\r\n    <m:ListOfContinentsByNameResponse xmlns:m=\"http://www.oorsprong.org/websamples.countryinfo\">\r\n      <m:ListOfContinentsByNameResult>\r\n        <m:tContinent>\r\n          <m:sCode>AF</m:sCode>\r\n          <m:sName>Africa</m:sName>\r\n        </m:tContinent>\r\n        <m:tContinent>\r\n          <m:sCode>AN</m:sCode>\r\n          <m:sName>Antarctica</m:sName>\r\n        </m:tContinent>\r\n        <m:tContinent>\r\n          <m:sCode>AS</m:sCode>\r\n          <m:sName>Asia</m:sName>\r\n        </m:tContinent>\r\n        <m:tContinent>\r\n          <m:sCode>EU</m:sCode>\r\n          <m:sName>Europe</m:sName>\r\n        </m:tContinent>\r\n        <m:tContinent>\r\n          <m:sCode>OC</m:sCode>\r\n          <m:sName>Ocenania</m:sName>\r\n        </m:tContinent>\r\n        <m:tContinent>\r\n          <m:sCode>AM</m:sCode>\r\n          <m:sName>The Americas</m:sName>\r\n        </m:tContinent>\r\n      </m:ListOfContinentsByNameResult>\r\n    </m:ListOfContinentsByNameResponse>\r\n  </soap:Body>\r\n</soap:Envelope>"
    I expect contain "<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <m:ListOfContinentsByNameResponse xmlns:m="http://www.oorsprong.org/websamples.countryinfo">
      <m:ListOfContinentsByNameResult>
        <m:tContinent>
          <m:sCode>AF</m:sCode>
          <m:sName>Africa</m:sName>
        </m:tContinent>
        <m:tContinent>
          <m:sCode>AN</m:sCode>
          <m:sName>Antarctica</m:sName>
        </m:tContinent>
        <m:tContinent>
          <m:sCode>AS</m:sCode>
          <m:sName>Asia</m:sName>
        </m:tContinent>
        <m:tContinent>
          <m:sCode>EU</m:sCode>
          <m:sName>Europe</m:sName>
        </m:tContinent>
        <m:tContinent>
          <m:sCode>OC</m:sCode>
          <m:sName>Ocenania</m:sName>
        </m:tContinent>
        <m:tContinent>
          <m:sCode>AM</m:sCode>
          <m:sName>The Americas</m:sName>
        </m:tContinent>
      </m:ListOfContinentsByNameResult>
    </m:ListOfContinentsByNameResponse>
  </soap:Body>
</soap:Envelope>", "Europe"
  ✔ OK in 246ms


  OK  | 1 passed   // 250ms

```
