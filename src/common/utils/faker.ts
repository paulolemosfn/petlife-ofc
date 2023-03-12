import { faker, Faker } from '@faker-js/faker';
import * as cnpjUtils from '@fnando/cnpj';
import * as cpfUtils from '@fnando/cpf';
faker.setLocale('pt_BR');

const local = {
  random: {
    cnpj: (withMask = false) =>
      withMask ? cnpjUtils.generate(true) : cnpjUtils.generate(),
    cpf: (withMask = false) =>
      withMask ? cpfUtils.generate(true) : cpfUtils.generate(),
  },
};

export class FakerUtils {
  public static faker(): Faker {
    return faker;
  }

  public static brazillianCulture() {
    return local;
  }
}
