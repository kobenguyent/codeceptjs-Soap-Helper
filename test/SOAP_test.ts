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

