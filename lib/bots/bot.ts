interface Bot {
  init(): Promise<string>;
  update(data: any): void;
}

export default Bot;
