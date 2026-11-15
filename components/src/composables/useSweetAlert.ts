import Swal from 'sweetalert2';
import type { Ref } from 'vue';
import type { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export const useSweetAlert = (theme?: Ref<SweetAlertOptions['theme']>) => {
  const fire = (options: Pick<SweetAlertOptions, 'title' | 'icon' | 'timer'>): Promise<SweetAlertResult> => {
    return Swal.fire({
      toast: true,
      position: 'bottom-end',
      timer: 3000,
      showConfirmButton: false,
      theme: theme?.value || 'light',
      ...options,
    });
  };

  const fireSuccess = (title: string): Promise<SweetAlertResult> => {
    return fire({ title, icon: 'success', timer: 1700 });
  };

  const fireInfo = (title: string, timer = 3000): Promise<SweetAlertResult> => {
    return fire({ title, icon: 'info', timer });
  };

  const fireError = (title: string, timer = 3000): Promise<SweetAlertResult> => {
    return fire({ title, icon: 'error', timer });
  };

  const close = (): void => {
    Swal.close();
  };

  const isVisible = (): boolean => {
    return Swal.isVisible();
  };

  return {
    fire,
    fireSuccess,
    fireInfo,
    fireError,
    close,
    isVisible,
  };
};
