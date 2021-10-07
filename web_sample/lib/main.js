requirejs.config({
  baseUrl: "./lib",
  paths: {
    handlebars: "./handlebars.amd",
    MedMe: "../../dist/browser/bundle",
    bootstrap: "./bootstrap",
    jquery: "./jquery.slim.min",
  },
  shim: {
    bootstrap: {
      deps: ["jquery"],
    },
  },
});

define("3dparts", ["handlebars", "bootstrap", "jquery"]);

requirejs(
  [
    "3dparts",
    "auth",
    "MedMe",
    "env",
    "env-info",
    "clients-settings",
    "clients-info",
  ],
  function (_, auth, MedMe, env, envInfo, clients, clientsInfo) {
    // берем бизнес и нетворк из данных пользователя
    if (clients.current) {
      env.current.businessId = clients.current.business;
      env.current.networkId = clients.current.network;
    }

    envInfo.renderPanel(MedMe.EHR.SDK_VERSION, env);
    // clientsInfo.renderPanel(clients);
    auth.login(
      document.getElementById("mainContent"),
      function (authenticatedPatient) {
        if (authenticatedPatient) requirejs(["medme-app"]);
      }
    );
  }
);
