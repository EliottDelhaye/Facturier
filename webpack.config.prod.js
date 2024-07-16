var path = require("path"); // Importe le module path pour manipuler les chemins de fichiers

var cleanPlugin = require("clean-webpack-plugin"); // Importe le plugin clean-webpack-plugin pour nettoyer le dossier de sortie

// Exporte la configuration pour webpack :
module.exports = {
  mode: "production", // Mode de production pour webpack
  entry: "./src/index.ts", // Point d'entrée pour l'application
  // Configuration de sortie pour le bundle :
  output: {
    filename: "bundle.js", // Nom du fichier bundle généré
    path: path.resolve(__dirname, "public"), // Chemin du dossier où le bundle sera généré
  },
  // Configuration du mode de développement :
  devtool: "false", // Désactive la génération de sources maps
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
  plugin: [
    new cleanPlugin.CleanWebpackPlugin({
      dry: true, // Active le mode sec pour afficher les fichiers à supprimer
      verbose: true, // Active le mode verbeux pour afficher les fichiers supprimés
      cleanOnceBeforeBuildPatterns: ["**/*","!static-files*"], // Supprime tous les fichiers du dossier de sortie sauf le dossier static-files
    }
    ), // Utilise le plugin clean-webpack-plugin pour nettoyer le dossier de sortie
  ],
};
