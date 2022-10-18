import {useSwitcherNav} from './SwitcherNav';
import {DaisyColorSmall} from '@solsy/ui';
import {createMemo, createSignal, onMount, ParentProps} from 'solid-js';

export const SwitcherNavItem = (props: ParentProps) => {
  const [ref, setRef] = createSignal<HTMLElement>();
  const [value, setValue] = createSignal<number>();
  const nav = useSwitcherNav();

  const isActive = createMemo(() => {
    return nav.state.value === value();
  });

  const isActiveColor = (color: DaisyColorSmall) => {
    return nav.state.color === color && isActive();
  };

  onMount(() => {
    init(ref());
  });

  function init(el: HTMLElement) {
    const value = nav.setItem(el);
    setValue(value);
  }

  function onClick() {
    nav.checkItem(value());
  }

  return (
    <button
      ref={setRef}
      onClick={onClick}
      class="flex-1 flex items-center justify-center"
      classList={{
        'btn-lg': nav.state.size === 'lg',
        'btn-md': nav.state.size === 'md',
        'btn-sm': nav.state.size === 'sm',
        'btn-xs': nav.state.size === 'xs',
      }}
    >
      <span
        classList={{
          'text-primary': nav.state.color === 'primary',
          'text-secondary': nav.state.color === 'secondary',
          'text-accent': nav.state.color === 'accent',

          'text-primary-content': isActiveColor('primary'),
          'text-secondary-content': isActiveColor('secondary'),
          'text-accent-content': isActiveColor('accent'),
        }}
      >
        {props.children}
      </span>
    </button>
  );
};
