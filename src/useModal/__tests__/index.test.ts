import { act, renderHook } from '@testing-library/react-hooks';
import useModal from '../index';

const setUp = <T>() => renderHook(() => useModal<T>());

describe('useModal', () => {
  it('should init state', () => {
    const { result } = setUp();

    expect(result.current.visible).toBe(false);
    expect(result.current.initValue).toBe(undefined);
    expect(typeof result.current.openModal).toBe('function');
    expect(typeof result.current.closeModal).toBe('function');
  });

  it('should work openModal and closeModal', () => {
    const { result } = setUp();

    expect(result.current.visible).toBe(false);

    act(() => {
      result.current.openModal();
    });
    expect(result.current.visible).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.visible).toBe(false);
  });

  it('should work openModel with initValue', () => {
    const { result } = setUp<{ name: string }>();

    expect(result.current.visible).toBe(false);

    act(() => {
      result.current.openModal({
        name: 'Tom'
      });
    });
    expect(result.current.visible).toBe(true);
    expect(result.current.initValue!.name).toEqual('Tom');

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.visible).toBe(false);
  });
});
