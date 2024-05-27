module.export = {
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  // collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/Src/$1",
  },
  coverageReporters: ["cobertura", "lcov", "text"],
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
};
