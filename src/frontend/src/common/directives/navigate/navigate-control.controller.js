/**
 * @param $state
 * @ngInject
 */
export default function navigateControlController($state) {
  const vm = this;

  ensureStateIsSet();
  ensureLabelAndTitle();
  ensureTooltip();

  function ensureTooltip() {
    if (!vm.tooltipDir) {
      vm.tooltipDir = 'bottom';
    }
    if (!vm.tooltipText) {
      const tooltipTextLeft = vm.label || vm.title;
      if (!tooltipTextLeft) {
        return;
      }
      vm.tooltipText = `Navigate to ${tooltipTextLeft}`;
    }
  }

  function ensureLabelAndTitle() {
    if (vm.label && !vm.title) {
      vm.title = vm.label;
    } else if (!vm.label && vm.title) {
      vm.label = vm.title;
    }
  }

  function ensureStateIsSet() {
    if (!vm.state) {
      let states = $state.get();
      states.forEach((state) => {
        if (state.master) {
          vm.state = state.name;
          vm.icon = 'home';
          return true;
        }
      })
    }
  }
}