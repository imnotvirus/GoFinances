module.exports = function (plop) {
  // create your generators here
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/component/index.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/styles.ts",
        templateFile: "plop-templates/component/styles.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/types.ts",
        templateFile: "plop-templates/component/types.hbs",
      },
    ], // array of actions
  });
  // create your generators here
  plop.setGenerator("screen", {
    description: "Create a new screen",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your screen name?",
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: "src/screens/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/screen/index.hbs",
      },
      {
        type: "add",
        path: "src/screens/{{pascalCase name}}/styles.ts",
        templateFile: "plop-templates/screen/styles.hbs",
      },
      {
        type: "add",
        path: "src/screens/{{pascalCase name}}/types.ts",
        templateFile: "plop-templates/screen/types.hbs",
      },
    ], // array of actions
  });
};
