import {SwitcherNavItem} from './SwitcherNavItem';
import {DaisyColorSmall, DaisySize} from '@solsy/ui';
import {
  createContext,
  createSignal,
  onMount,
  ParentProps,
  Show,
  useContext,
} from 'solid-js';
import {createStore} from 'solid-js/store';

export type SwitcherNavState = {
  items: HTMLElement[];
  activeItem?: HTMLElement;
  value?: number;

  color?: DaisyColorSmall;
  size?: DaisySize;
};

export type SwitcherNavCtx = {
  state: SwitcherNavState;
  setValue: (v: number) => void;
  setItem: (el: HTMLElement) => number;
  checkItem: (v: number) => void;
};

const SwitcherNavCtx = createContext<SwitcherNavCtx>();

export const useSwitcherNav = () => {
  const ctx = useContext(SwitcherNavCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('no context for SwitcherNav');
};

export type SwitcherNavProps = {
  color?: DaisyColorSmall;
  size?: DaisySize;

  value?: number;
  onInput?: (v: number) => void;
};

const SwitcherNavBase = (props: ParentProps<SwitcherNavProps>) => {
  const [state, setState] = createStore<SwitcherNavState>({
    items: [],
    value: props.value,
    get activeItem() {
      return this.items[this.value - 1];
    },
    get color() {
      return props.color;
    },
    get size() {
      return props.size || 'md';
    },
  });

  const [navRef, setNavRef] = createSignal<HTMLElement>();
  const [switcherPosition, setSwitcherPosition] = createSignal({
    left: 0,
    width: 0,
    height: 0,
  });

  onMount(() => {
    setTimeout(updateSwitcherPosition);
  });

  function setValue(v: number) {
    setState('value', v);
    updateSwitcherPosition();
    props.onInput?.(v);
  }

  function setItem(el: HTMLElement) {
    setState('items', items => [...items, el]);
    return state.items.length;
  }

  function checkItem(v: number) {
    setValue(v);
    props.onInput?.(v);
  }

  function updateSwitcherPosition() {
    let activeItem = state.activeItem;
    if (!activeItem) {
      activeItem = navRef();
    }

    setSwitcherPosition({
      left: activeItem.scrollWidth * (state.value - 1),
      width: activeItem.scrollWidth,
      height: activeItem.scrollHeight,
    });
  }

  return (
    <SwitcherNavCtx.Provider
      value={{
        state,
        setValue,
        setItem,
        checkItem,
      }}
    >
      <div ref={setNavRef} class="flex relative justify-evenly">
        <Show when={!!state.activeItem} keyed>
          <div
            class="absolute top-0 rounded transition-all -z-10 bg-base-300"
            classList={{
              'bg-primary': state.color === 'primary',
              'bg-secondary': state.color === 'secondary',
              'bg-accent': state.color === 'accent',
            }}
            style={{
              left: switcherPosition().left + 'px',
              width: switcherPosition().width + 'px',
              height: switcherPosition().height + 'px',
            }}
          />
        </Show>

        {props.children}
      </div>
    </SwitcherNavCtx.Provider>
  );
};

export const SwitcherNav = Object.assign(SwitcherNavBase, {
  Item: SwitcherNavItem,
});
