enum Topology {
  t2 = 'T2',
  t3 = 'T3',
  t4 = 'T4',
  UNKNOWN = 'Unknown'
}

enum Status {
  MATCHED = 'Matched',
  OUT_OF_FILTER = 'Out of filter',
  PENDING = 'Pending',
  UNVAILABLE = 'Unvailable',
  UNKNOWN = 'Unknown'
}

enum Ngr {
  A_PLUS = 'A+',
  A = 'A',
  B_PLUS = 'B+',
  B = 'B',
  B_MINUS = 'B-',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  UNKNOWN = 'Unknown'
}

enum Provider {
  CUSTO_JUSTO = 'custojusto',
  OLX = 'olx',
  IMOVIRTUAL = 'imovirtual',
  IDEALISTA = 'idealista'
}

class Property {
  constructor(
    public _id?: string, // tslint:disable-line:variable-name
    public title?: string,
    public provider?: Provider,
    public url?: string,
    public ngr?: Ngr,
    public price?: number,
    public createAt?: Date,
    public topology?: Topology,
    public status?: Status,
    public notificated?: boolean) {
  }
}

export { Topology, Status, Provider, Ngr };
export default Property;
