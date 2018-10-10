module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: false }
    ],
    'class-methods-use-this': 0,
    'global-require': 0,
    'react/prop-types': 0,
    'no-return-assign': 0,
    'no-sequences': 0,
    'func-names': 0,
    'max-len': ['error', { code: 200 }],
    'no-param-reassign': ['error', { props: false }],
    'react/sort-comp': [
      2,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'render']
      }
    ]
  }
};
