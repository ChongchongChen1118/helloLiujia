Component({
  properties: {
    //small、default、large
			size: {
				type: String,
				value: 'default'
			},
			gap: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			background: {
				type: String,
				value: 'transparent'
			},
			radius: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			marginTop: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			marginBottom: {
        type: String,
        optionalTypes:[Number],
				value: 0
			}
  },
  methods: {
    handleClick() {
      this.triggerEvent('click')
    }
  }
})
