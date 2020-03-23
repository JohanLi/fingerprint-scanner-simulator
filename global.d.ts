declare module '*.scss' {
  const classNames: {
    [className: string]: string;
  };
  export = classNames;
}

declare module '*.png';
