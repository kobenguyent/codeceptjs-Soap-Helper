export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    SOAPHelper: {
      require: '../src/SoapHelper.ts',
      endpoint: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso'
    },
    ExpectHelper: {
      require: 'codeceptjs-expect'
    },
  },
  include: {
    I: './steps_file'
  },
  name: 'test'
}