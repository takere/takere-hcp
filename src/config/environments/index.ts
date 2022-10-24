import ProductionApiConfig from "./production.environment";
import TestApiConfig from "./test.environment";


const environments = {
  PRODUCTION: ProductionApiConfig,
  TEST: TestApiConfig
}

export default environments;
