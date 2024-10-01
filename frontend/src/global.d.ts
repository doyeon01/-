declare module '*.json' {
  const value: any;
  export default value;
}

export interface Error {
  message: string;
  status: number;
}