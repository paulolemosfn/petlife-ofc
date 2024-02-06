import { FormatDateEnum, formatDate } from '../date';

describe('Suite tests formatDate', () => {
  it('CASE YYYY-MM-DD', () => {
    expect(formatDate('2022-02-24', FormatDateEnum.YYYY_MM_DDD)).toBe(
      '2022-02-24',
    );
  });

  it('CASE MM_SOLIDUS_YYYY', () => {
    expect(formatDate('2022-02', FormatDateEnum.MM_SOLIDUS_YYYY)).toBe(
      '02/2022',
    );
  });

  it('CASE DD_SOLIDUS_MM_SOLIDUS_YYYY', () => {
    expect(
      formatDate(
        '2023-01-27T14:16:03.440Z',
        FormatDateEnum.DD_SOLIDUS_MM_SOLIDUS_YYYY,
      ),
    ).toBe('27/01/2023');
  });
});
