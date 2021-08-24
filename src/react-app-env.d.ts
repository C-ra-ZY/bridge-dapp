declare module "*.module.less" {
    const less: { readonly [key: string]: string };
    export default less;
  }
  declare module "*.module.css" {
    const css: { [key: string]: string };
    export default css;
  }
  declare module '*.svg'
  declare module '*.png'
  declare module '*.jpg'
  declare module '*.jpeg'
  declare module '*.gif'
  declare module '*.webp'
