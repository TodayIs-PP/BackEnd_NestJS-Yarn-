export class AddFood {
  constructor(
    name: string,
    image: string,
    kind1: string,
    kind2: string,
    flavor1: string,
    flavor2?: string,
  ) {
    this.name = name;
    this.image = image;
    this.kind1 = kind1;
    this.kind2 = kind2;
    this.flavor1 = flavor1;
    this.flavor2 = flavor2;
  }

  name: string;

  image: string;

  kind1: string;

  kind2: string;

  flavor1: string;

  flavor2: string;
}
