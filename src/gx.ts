const branches: Fig.Generator = {
  script: "git branch --no-color",
  postProcess: (output) => {
    if (output.startsWith("fatal:")) {
      return [];
    }
    return output.split("\n").map((branch) => {
      return { name: branch.replace("*", "").trim(), description: "Branch" };
    });
  },
};

const completionSpec: Fig.Spec = {
  name: "gx",
  description: "The stupid content tracker",
  subcommands: [
    {
      name: "checkout",
      description: "Switch branches or restore working tree files",
      args: {
        name: "branch",
        description: "The branch you want to checkout",
        isOptional: true,
        generators: branches,
      },
      options: [
        {
          name: "-b",
          description: "Create and checkout a new branch",
          args: {
            name: "New branch",
          },
        },
      ],
    },
    {
      name: "add",
      description: "Stage files to commit",
      args: {
        template: "filepaths",
      },
    },
  ],
};

export default completionSpec;
