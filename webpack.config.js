var path = require("path"); // Importe le module path pour manipuler les chemins de fichiers

// Exporte la configuration pour webpack :
module.exports = {
  mode: "development", // Mode de développement pour webpack
  entry: "./src/index.ts", // Point d'entrée pour l'application
  // Configuration de sortie pour le bundle :
  output: {
    filename: "bundle.js", // Nom du fichier bundle généré
    path: path.resolve(__dirname, "public"), // Chemin du dossier où le bundle sera généré
  },
  // Configuration du serveur de développement :
  devServer: {
    static: { directory: path.resolve(__dirname, "public") }, // Dossier racine du serveur de développement
    compress: true, // Active la compression des fichiers
    port: 8080, // Port du serveur de développement
  },
  // Configuration du mode de développement :
  devtool: "inline-source-map", // Génère des sources maps pour faciliter le débogage
  // Configuration du module pour les règles de chargement :
  module: {
    rules: [
      {
        test: /\.ts$/, // Teste les fichiers pour l'extension .ts
        use: "ts-loader", // Utilise ts-loader pour traiter les fichiers .ts
        exclude: /node_modules/, // Exclut le dossier node_modules du traitement par ts-loader
      },
    ],
  },
  // Configuration pour résoudre les extensions de fichiers :
  resolve: {
    extensions: [".ts", ".js"], // Extensions de fichiers à résoudre automatiquement
  },
};
