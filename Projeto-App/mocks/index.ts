import { fakerPT_BR as faker } from "@faker-js/faker"; // biblioteca para gerar dados aleatorios

export function grupos() {
  return faker.helpers.multiple(gerarGrupo, {
    count: faker.number.int({ min: 5, max: 10 }),
  });
}

export function gerarGrupo(): IGrupo {
  return {
    id: faker.string.uuid(),
    nome: "Grupo "+ faker.number.int({
      max:999 // limitações para caracteres nao ser muito grande
    }),
    descricao: faker.lorem.sentence({
      max: 10,
      min: 1,
    }),
    imagem: "https://static.vecteezy.com/ti/vetor-gratis/p1/9734564-default-avatar-profile-icon-of-social-media-user-vetor.jpg", // imagem mudada icone
    quantidadeMaxima: faker.number.int({
      max: 150,
    }),
    dataRevelacao: faker.date.future(),
  };
}

export function convites() {
  return faker.helpers.multiple(gerarConvite, {
    count: faker.number.int({ min: 10, max: 20 }),
  });
}

export function gerarConvite(): IConvite {
  return {
    id: faker.string.uuid(),
    codigo: faker.number.int({ min: 11111, max: 9999999 }).toString(),
    grupoId: faker.string.uuid(),
  };
}

export interface IConvite {
  id: string;
  codigo: string;
  grupoId: string;
  grupo?: IGrupo;
}

export interface IGrupo {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  quantidadeMaxima: number;
  dataRevelacao: Date;
}
