<script>
export default {
  props: {
    listLength: Number
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  render(h) {
    return h(
      "ul",
      this.$scopedSlots.default({ selectedIndex: this.selectedIndex })
    );
  },
  methods: {
    keyHandler(e) {
      /**
        38 - up
        40 - down
        9 - tab
        13 - enter
       */
      const key = e.which || e.keyCode;

      if (key === 38 || (e.shiftKey && key === 9)) {
        this.handleKeyUp(e);
        this.$emit('key-up');
      } else if (key === 40 || key === 9) {
        this.handleKeyDown(e);
        this.$emit('key-down');
      }
    },
    handleKeyUp(e) {
      e.preventDefault();
      if (this.selectedIndex <= 0) {
        // If index is less than or equal to zero then set it to the last item index
        this.selectedIndex = this.listLength - 1;
      } else if (
        this.selectedIndex > 0 &&
        this.selectedIndex <= this.listLength - 1
      ) {
        // If index is larger than zero and smaller or equal to last index then decrement
        this.selectedIndex--;
      }
    },

    handleKeyDown(e) {
      e.preventDefault();
      // Check if index is below 0
      // This means that we did not start yet
      if (
        this.selectedIndex < 0 ||
        this.selectedIndex === this.listLength - 1
      ) {
        // Set the index to the first item
        this.selectedIndex = 0;
      } else if (
        this.selectedIndex >= 0 &&
        this.selectedIndex < this.listLength - 1
      ) {
        this.selectedIndex++;
      }
    },
    addKeyHandler(e) {
      window.addEventListener("keydown", this.keyHandler);
    },

    removeKeyHandler() {
      window.removeEventListener("keydown", this.keyHandler);
    }
  },
  created() {
    this.addKeyHandler();
  },
  destroyed() {
    this.removeKeyHandler();
  }
};
</script>
