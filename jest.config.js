module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }],
    },
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/components/$1',   
      '^@/(.*)$': '<rootDir>/app/$1',                     
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };
  