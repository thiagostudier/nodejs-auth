const faker = require("faker-br");

// GERAR USUÁRIO PADRÃO
const user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: "comum",
  photo: "",
  token: "",
  id: "",
};

// GERAR USUÁRIO ADMIN
const admin = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: "admin",
  photo: "",
  token: "",
};

// GERAR PACIENTE
const patient = {
  id: "",
  name: faker.name.findName(),
  email: faker.internet.email(),
  cpf: faker.br.cpf(),
  date: "1998-02-28",
  cep: "92120210",
  street: faker.address.streetName(),
  city: faker.address.city(),
  number: faker.random.number(),
  district: faker.address.city(),
  state: faker.address.stateAbbr(),
  whatsapp: faker.internet.url(),
};

// GERAR PROCEDIMENTO
const procedure = {
  id: "",
  name: faker.name.findName(),
  price: 499.99,
  order: faker.random.number(),
};

// GERAR TEMPLATE
const template = {
  id: "",
  name: faker.name.findName(),
  type: faker.name.findName(),
};

// GERAR QUESTÃO DO TEMPLATE
const question_template = [
  {
    id: "",
    name: faker.name.findName(),
    type: faker.name.findName(),
    variables: faker.lorem.paragraphs(),
    order: faker.random.number(),
    template_id: "",
  },
  {
    id: "",
    name: faker.name.findName(),
    type: faker.name.findName(),
    variables: faker.lorem.paragraphs(),
    order: faker.random.number(),
    template_id: "",
  },
  {
    id: "",
    name: faker.name.findName(),
    type: faker.name.findName(),
    variables: faker.lorem.paragraphs(),
    order: faker.random.number(),
    template_id: "",
  }
];

export { user, admin, patient, procedure, template, question_template };
