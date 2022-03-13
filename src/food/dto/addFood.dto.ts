export class AddFood {
  constructor(
    name?: string,
    kind1?: string,
    kind2?: string,
    flavor1?: string,
    flavor2?: string,
  ) {
    this.name = name ?? null;
    this.kind1 = kind1 ?? null;
    this.kind2 = kind2 ?? null;
    this.flavor1 = flavor1 ?? null;
    this.flavor2 = flavor2 ?? null;
  }

  name: string;

  kind1: string;

  kind2: string;

  flavor1: string;

  flavor2: string;
}
