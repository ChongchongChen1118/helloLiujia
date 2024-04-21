Component({
  properties: {
      //small、default、large
      size: {
        type: String,
        value: 'default'
      },
      height: {
        type: String,
        optionalTypes:[Number],
        value: 0
      },
      background: {
        type: String,
        value: 'transparent'
      }
  },
  methods: {
    handleClick(){
      this.triggerEvent('click')
    }
  }
})
