import * as React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const propsDefaults: ButtonProps = {
  type: 'button',
};

export function Button(props: ButtonProps) {
  props = Object.assign({}, propsDefaults, props);

  return (
    <button className="button" onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
}
