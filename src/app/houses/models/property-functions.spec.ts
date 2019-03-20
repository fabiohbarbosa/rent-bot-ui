import { priceComparableAsc, priceComparableDesc } from './property.functions';

describe('property-functions', () => {

  describe('priceComparableAsc', () => {
    it('should first one be bigger than second one', () => {
      expect(priceComparableAsc({ price: 1000 }, { price: 100 })).toBe(1);
    });

    it('should first one be smaller than second one', () => {
      expect(priceComparableAsc({ price: 100 }, { price: 1000 })).toBe(-1);
    });

    it('should first one be equals than second one', () => {
      expect(priceComparableAsc({ price: 1000 }, { price: 1000 })).toBe(0);
    });
  });

  describe('priceComparableDesc', () => {
    it('should first one be smaller than second one', () => {
      expect(priceComparableDesc({ price: 1000 }, { price: 100 })).toBe(-1);
    });

    it('should first one be bigger than second one', () => {
      expect(priceComparableDesc({ price: 100 }, { price: 1000 })).toBe(1);
    });

    it('should first one be equals than second one', () => {
      expect(priceComparableDesc({ price: 1000 }, { price: 1000 })).toBe(0);
    });
  });

});
