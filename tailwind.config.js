module.exports = {
  purge: [],
  theme: {
    extend: {
      spacing: {
        '76': '20rem',
        '88': '22rem',
        '100': '25rem',
        '101': '28rem',
        '102': '30rem',
        '103': '35rem',
        '1vw': '1vw',
        '1.25vw': '1.25vw',
        '10vh': '10vh',
        '15vh': '15vh',
        '20vh': '20vh',
        '80vh': '80vh',
        '70vh': '70vh',
        '60vh': '60vh',
        '90vh': '90vh',
      },
      fontFamily: {
        Nunito: ['Nunito']
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'active', 'hover','focus'],
    borderColor: ['responsive','active', 'hover','focus']
  },
  plugins: [],
}
