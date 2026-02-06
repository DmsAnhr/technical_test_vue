export interface ReportItem {
  id: string;
  title: string;
  pageSize: string;
  amount: number;
  description: string;
  date: string;
}

const history = ref<ReportItem[]>([]); 
const isInitialized = ref(false);

export const useReport = () => {

    if (!isInitialized.value) {
      if (import.meta.client) {
        const saved = localStorage.getItem('pdf-history');
        if (saved) {
          try {
            history.value = JSON.parse(saved);
          } catch (e) {
            console.error('Gagal load history', e);
          }
        }
      }
      isInitialized.value = true;
    }

    const addToHistory = (form: Omit<ReportItem, 'id' | 'date'>) => {
      const newItem: ReportItem = {
        ...form,
        id: crypto.randomUUID(),
        date: new Date().toISOString()
      };

      history.value.unshift(newItem);

      saveToStorage();
    };

    const saveToStorage = () => {
      if (import.meta.client) {
        localStorage.setItem('pdf-history', JSON.stringify(history.value));
      }
    };

    const formatDate = (isoString: string) => {
      return new Date(isoString).toLocaleString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    };

    const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val);
    };

    return {
      history,
      addToHistory,
      formatDate,
      formatCurrency
    };
};