import { checkbox } from "@inquirer/prompts";

export const collectProjectInfo = () => {
  return checkbox({
    message: "Select the stages of software development you want to include:",
    choices: [
      {
        name: "rd",
        value: "rd",
        description: "Requement Document",
      },
      {
        name: "bd",
        value: "bd",
        description: "Basic Design",
      },
      {
        name: "dd",
        value: "dd",
        description: "Detailed Design",
      },
      {
        name: "code",
        value: "code",
        description: "Code Implementation",
      },
      {
        name: "test",
        value: "test",
        description: "Testing",
      },
    ],
  });
};
