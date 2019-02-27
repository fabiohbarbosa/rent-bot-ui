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
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  UNKNOWN = 'Unknown'
}

class Property {
  constructor(
    public _id: string,
    public title: string,
    public url: string,
    public ngr: Ngr,
    public price: number,
    public createAt: Date,
    public topology: Topology,
    public status: Status,
    public notificated: boolean) {
  }
}

// get by index
const getEnumByIndex = <T>(index: string, Enum, Default: T): T => {
  const instance = Enum[index];
  if (instance) return instance;
  return Default;
};

const getTopologyFromIndex = (index: string): Topology => {
  return getEnumByIndex<Topology>(index, Topology, Topology.UNKNOWN);
};

const getStatusByIndex = (index: string): Status => {
  return getEnumByIndex<Status>(index, Status, Status.UNKNOWN);
};

// get by value
const getEnumByValue = <T>(value: string, Enum): T => {
  const instances = Object.entries(Enum)
        .filter(entries => entries[1] === value)
        .map(entries => entries[0])
        .map(index => Enum[index]);

  if (instances.length !== 1) {
    throw Error(`Found ${instances.length} elements for value '${value}'`)
  }
  return instances[0];
};

const getTopologyByValue = (value: string): Topology => {
  return getEnumByValue<Topology>(value, Topology);
};

const getStatusByValue = (value: string): Status => {
  return getEnumByValue<Status>(value, Status);
};

const getNgrByValue = (value: string): Ngr => {
  return getEnumByValue<Ngr>(value, Ngr);
};

const ngr: object = {
  'a+': Ngr.A_PLUS,
  '+a': Ngr.A_PLUS,
  'a': Ngr.A,
  'b+': Ngr.B_PLUS,
  '+b': Ngr.B_PLUS,
  'b': Ngr.B,
  'c': Ngr.C,
  'd': Ngr.D,
  'e': Ngr.E,
  'f': Ngr.F,
  'Unknown': Ngr.UNKNOWN,
}

const getNgrByString = (value: string): Ngr => {
  if (!value) return Ngr.UNKNOWN;

  const ngr = Ngr[value.toUpperCase()];
  if (ngr) return ngr;

  return Ngr.UNKNOWN;
};

export {
  Topology, getTopologyFromIndex, getTopologyByValue,
  Status, getStatusByIndex, getStatusByValue,
  Ngr, getNgrByString, getNgrByValue
 };

export default Property;
