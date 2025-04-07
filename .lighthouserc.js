module.exports = {
  ci: {
    collect: {
      startServerCommand: "yarn start",
      url: ["http://localhost:3000"]
    },
    assert: {
      assertions: {
        seo: ["warn", { minScore: 0.95 }],
        accessibility: ["warn", { minScore: 0.95 }],
        "best-practices": "off"
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
}
