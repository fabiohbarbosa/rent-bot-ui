import Property, { Topology, Status, Provider, Ngr } from './property.model';

// get by index
const getEnumByIndex = <T>(index: string, Enum, Default: T = undefined): T => {
  const instance = Enum[index];
  if (instance) { return instance; }
  return Default;
};

const getTopologyFromIndex = (index: string): Topology => {
  return getEnumByIndex<Topology>(index, Topology, Topology.UNKNOWN);
};

const getStatusByIndex = (index: string): Status => {
  return getEnumByIndex<Status>(index, Status, Status.UNKNOWN);
};

const getProviderByIndex = (index: string): Provider => {
  return getEnumByIndex<Provider>(index, Provider);
};

// get by value
const getEnumByValue = <T>(value: string, Enum): T => {
  const instances = Object.entries(Enum)
        .filter(entries => entries[1] === value)
        .map(entries => entries[0])
        .map(index => Enum[index]);

  if (instances.length !== 1) {
    throw Error(`Found ${instances.length} elements for value '${value}'`);
  }
  return instances[0];
};

const getTopologyByValue = (value: string): Topology => {
  return getEnumByValue<Topology>(value, Topology);
};

const getStatusByValue = (value: string): Status => {
  return getEnumByValue<Status>(value, Status);
};

const getProviderByValue = (value: string): Provider => {
  return getEnumByValue<Provider>(value, Provider);
};

const getNgrByValue = (value: string): Ngr => {
  return getEnumByValue<Ngr>(value, Ngr);
};

const ngrMatcher = {
  'A++': { enumType: Ngr.A_PLUS, index: 0 },
  '++A': { enumType: Ngr.A_PLUS, index: 0 },
  'A+': { enumType: Ngr.A_PLUS, index: 1 },
  '+A': { enumType: Ngr.A_PLUS, index: 1 },
  A: { enumType: Ngr.A, index: 2 },
  'B+': { enumType: Ngr.B_PLUS, index: 3 },
  '+B': { enumType: Ngr.B_PLUS, index: 3 },
  B: { enumType: Ngr.B, index: 4 },
  '-B': { enumType: Ngr.B_MINUS, index: 5 },
  'B-': { enumType: Ngr.B_MINUS, index: 5 },
  C: { enumType: Ngr.C, index: 6 },
  D: { enumType: Ngr.D, index: 7 },
  E: { enumType: Ngr.E, index: 8 },
  F: { enumType: Ngr.F, index: 9 },
  G: { enumType: Ngr.F, index: 10 },
  UNKNOWN: { enumType: Ngr.UNKNOWN, index: 11 }
};

const getNgrByString = (value: string): Ngr => {
  if (!value) { return Ngr.UNKNOWN; }

  const ngr = ngrMatcher[value.toUpperCase()];
  if (ngr) { return ngr.enumType; }

  return Ngr.UNKNOWN;
};

const ngrComparableAsc = (p1: Property, p2: Property): number => {
  const p1NgrIndex = ngrMatcher[p1.ngr] ? ngrMatcher[p1.ngr].index : ngrMatcher.UNKNOWN.index;
  const p2NgrIndex = ngrMatcher[p2.ngr] ? ngrMatcher[p2.ngr].index : ngrMatcher.UNKNOWN.index;
  if (p1NgrIndex < p2NgrIndex) { return -1; }
  if (p1NgrIndex > p2NgrIndex) { return 1; }
  return 0;
};

const ngrComparableDesc = (p1: Property, p2: Property): number => {
  const p1NgrIndex = ngrMatcher[p1.ngr] ? ngrMatcher[p1.ngr].index : ngrMatcher.UNKNOWN.index;
  const p2NgrIndex = ngrMatcher[p2.ngr] ? ngrMatcher[p2.ngr].index : ngrMatcher.UNKNOWN.index;
  if (p1NgrIndex > p2NgrIndex) { return -1; }
  if (p1NgrIndex < p2NgrIndex) { return 1; }
  return 0;
};

const priceComparableAsc = (p1: Property, p2: Property): number => {
  if (p1.price > p2.price) {
    return 1;
  } else if (p1.price < p2.price) {
    return -1;
  }
  return 0;
};

const priceComparableDesc = (p1: Property, p2: Property): number => {
  if (p1.price > p2.price) {
    return -1;
  } else if (p1.price < p2.price) {
    return 1;
  }
  return 0;
};

export {
  getTopologyFromIndex, getTopologyByValue,
  getStatusByIndex, getStatusByValue,
  getProviderByIndex, getProviderByValue,
  priceComparableAsc, priceComparableDesc,
  getNgrByString, getNgrByValue, ngrComparableAsc, ngrComparableDesc
 };
