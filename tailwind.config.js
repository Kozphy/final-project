module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        cheese: '#F2EFEB',
        shining: '#FCA311',
        
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active','group-hover'],
    color: ['responsive', 'hover', 'focus', 'active'],
    transitionDuration: ['responsive', 'hover', 'focus'],
    transitionProperty: ['responsive', 'hover', 'focus', 'motion-safe', 'motion-reduce'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    fontWeight: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    borderWidth: ['responsive', 'hover', 'focus'],
    lineHeight: ['responsive', 'hover', 'focus'],
  },

  plugins: [],
}
