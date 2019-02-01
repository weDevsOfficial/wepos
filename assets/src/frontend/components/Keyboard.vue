<script>
	const Tokens = {
		// Sequences that no-one will ever put in their keyboards.
		PIPE: '7440011c983cf39ae730b1f831e2922ac5a76910',
		OPEN_BRACE: 'f630c4abcae620278f82e142a526ef325c2a773a',
		CLOSE_BRACE: 'ad982c66898e02a5dab419ea7568421b03f68ee2'
	};

	export default {
		name: 'keyboard',

		props: {
			value: {
				type: String,
				default: ''
			},
			layouts: {
				type: [String, Array],
				required: true
			},
			maxlength: {
				type: Number,
				default: 0,
				validator: value => value >= 0
			},
			pattern: {
				type: String,
				default: null
			}
		},

		data() {
			return {
				layout: 0
			};
		},

		computed: {
			/**
			 * Whether or not the keyboard input has hit its maximum length.
			 * @returns {Boolean}
			 */
			full() {
				return this.maxlength > 0 && this.value.length >= this.maxlength;
			},

			/**
			 * Whether or not the keyboard input is empty.
			 * @return {Boolean}
			 */
			empty() {
				return this.value.length === 0;
			},

			/**
			 * Returns the lines that make up a layout.
			 * @return {Array}
			 */
			lines() {
				let layout = (Array.isArray(this.layouts) ? this.layouts : [this.layouts])[this.layout];

				return layout.replace('||', Tokens.PIPE)
					.replace('{{', Tokens.OPEN_BRACE)
					.replace('}}', Tokens.CLOSE_BRACE)
					.split('|');
			},

			/**
			 * Returns an array of buttons to render in the component.
			 * @returns {Array[]}
			 */
			buttons() {
				return this.lines.map(line => {
					// TODO: Could potentially rely on Object.values() here instead of being explicit.
					let stream = line.match(new RegExp(`(${Tokens.OPEN_BRACE}|${Tokens.CLOSE_BRACE}|${Tokens.PIPE}|.)`, 'g'));

					let buttons = [];
					let token = null;

					stream.forEach(char => {
						if (char === '{') {
							token = '';
						} else if (char === '}') {
							let command = token.split(':');
							let text = command.length > 1 ? command[0] : '';
							let action = command.length > 1 ? command[1] : command[0];
							let args = command.length > 2 ? command[2] : null;
							let method = null;

							if (['append', 'backspace', 'space', 'clear', 'goto'].indexOf(action) >= 0) method = this[action].bind(this, args);
							else method = this.$emit.bind(this, action, this);

							buttons.push({
								type: 'action',
								action: { name: action.replace(/\s+/g, '-').toLowerCase(), callable: method },
								value: text,
								args
							});

							token = null;
						} else {
							if (token !== null) {
								token += char;
							} else {
								if (char === Tokens.PIPE) char = '|';
								if (char === Tokens.OPEN_BRACE) char = '{';
								if (char === Tokens.CLOSE_BRACE) char = '}';

								buttons.push({
									type: 'char',
									action: { name: null, callable: this.append.bind(this, char) },
									value: char,
									args: null
								});
							}
						}
					});

					return buttons;
				});
			},

			/**
			 * Whether or not the current value matches the regex provided to pattern. Always
			 * returns true if no pattern was provided.
			 * @returns {Boolean}
			 */
			valid() {
				return !this.pattern || this.value.match(new RegExp(this.pattern));
			}
		},

		methods: {
			/**
			 * Mutates the keyboard value to a new value.
			 * @param {String} value The new value.
			 */
			mutate(value) {
				if (this.maxlength > 0) {
					value = value.slice(0, this.maxlength);
				}

				this.$emit('input', value);
			},

			/**
			 * Appends a new value to the end of the current keyboard value.
			 * @param {String} char The character(s) to append.
			 */
			append(char) {
				this.mutate(this.value + char);
			},

			/**
			 * Remove the last character from the current keyboard value.
			 */
			backspace() {
				this.mutate(this.value.slice(0, this.value.length - 1));
			},

			/**
			 * Add one whitespace character to the current keyboard value.
			 */
			space() {
				this.append(' ');
			},

			/**
			 * Go to a new layout.
			 * @param {Number} The layout index.
			 */
			goto(layout) {
				if (Array.isArray(this.layouts)) {
					if (layout >= 0 && layout < this.layouts.length) {
						this.layout = layout;
					} else {
						throw new Error('The requested layout does not exist.');
					}
				} else {
					throw new Error('A single non-array layout was provided.');
				}
			},

			/**
			 * Clear the entire keyboard value.
			 */
			clear() {
				this.mutate('');
			}
		}
	};
</script>

<template>
	<aside class="vue-keyboard" role="application" :class="{ full: full, empty: empty, valid: valid, invalid: !valid }" :data-value="value" :data-layout="layout">
		<div role="row" class="vue-keyboard-row" v-for="row in buttons" :data-keys="row.length">
			<button
				v-for="btn in row"
				class="vue-keyboard-key"
				role="button"
				:class="btn.type"
				:data-args="btn.args"
				:data-text="btn.value"
				:data-action="btn.action.name"
				@click.prevent="btn.action.callable"
				v-html="btn.value"
			></button>
		</div>
	</aside>
</template>

<style lang="less">
    aside.vue-keyboard {
        .vue-keyboard-row[data-keys="3"] {
            border-bottom: 1px solid #ECEEF0;

            button {
                border: none;
                font-size: 24px;
                text-align: center;
                width: 80px;
                height: 60px;
                padding: 5px 20px;
                display: inline-block;
                cursor: pointer;
                border-right: 1px solid #ECEEF0;
                color: #212121;
                &:last-child {
                    border-right:none;
                }

                span.keypord-icon {
                	&:before {
                		font-weight: bold;
                	}
                }
            }

            &:first-child {
                border-top: 1px solid #ECEEF0;
            }
        }

        .vue-keyboard-row[data-keys="2"] {
            button {
                border: none;
                width: 50%;
                padding: 15px;
                font-size: 14px;
                background: #3B80F4;
                color: #FFF;
                border-right: 1px solid #fff;
                &:last-child {
                    border-right: none;
                }
                span.keypord-icon {
                	&:before {
                		font-weight: bold;
                	}
                }
            }
        }
    }
</style>