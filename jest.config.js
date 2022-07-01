module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/jest-SVGTransformer.tsx',
    '\\.png$': '<rootDir>/jest-PNGTransformer.tsx',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
