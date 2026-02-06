<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
    
    <div class="p-6 border-b border-gray-100 bg-gray-50/50">
      <h2 class="text-lg font-semibold text-gray-800">Konfigurasi Laporan</h2>
      <p class="text-sm text-gray-500 mt-1">Lengkapi data di bawah ini untuk membuat PDF.</p>
    </div>
    
    <div class="p-6 space-y-6">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div class="col-span-1 space-y-1">
          <label class="block text-sm font-medium text-gray-700">
            Ukuran Halaman <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select 
              v-model="formData.pageSize"
              class="block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 focus:ring-2 outline-none transition sm:text-sm bg-white"
              :class="errors.pageSize ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
            >
              <option value="A4">A4</option>
              <option value="A5">A5</option>
              <option value="Letter">Letter</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <p v-if="errors.pageSize" class="text-xs text-red-500">{{ errors.pageSize }}</p>
        </div>

        <div class="col-span-1 md:col-span-3 space-y-1">
          <label class="block text-sm font-medium text-gray-700">
            Judul Laporan <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="formData.title"
            @input="clearError('title')"
            class="block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-2 outline-none transition sm:text-sm"
            :class="errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
            placeholder="Masukkan judul laporan..."
            maxlength="100"
          />
          <div class="flex justify-between items-center">
            <p class="text-xs h-4">Min. 5 karakter <span class="text-red-500">{{ errors.title }}</span></p>
            <p class="text-xs text-gray-400">{{ formData.title.length }}/100</p>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <CurrencyInput 
          v-model="formData.amount"
          label="Nominal (Rp)" 
          placeholder="0"
          :required="true"
          :error="!!errors.amount"
          :error-message="errors.amount"
          @update:model-value="clearError('amount')"
        />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">
          Deskripsi / Isi Laporan <span class="text-red-500">*</span>
        </label>
        <textarea 
          v-model="formData.description"
          @input="clearError('description')"
          rows="4"
          class="block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-2 outline-none transition sm:text-sm resize-y"
          :class="errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'"
          placeholder="Masukkan isi laporan..."
        ></textarea>
        <p class="text-xs text-red-500 h-4">{{ errors.description }}</p>
      </div>

      <div class="flex justify-between items-center pt-4 border-t border-gray-100">
        <div class="text-sm text-red-500 font-medium animate-pulse">
          {{ generalError }}
        </div>

        <button 
          @click="handleSubmit"
          :disabled="isLoading"
          class="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          
          {{ isLoading ? 'Generating...' : 'Generate PDF' }}
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-2"
    >
      <div v-if="showSuccessToast" class="absolute top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md flex items-center gap-2 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="block sm:inline">PDF berhasil di-generate!</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
    // State Form
    const formData = reactive({
        pageSize: 'A4',
        title: '',
        description: '',
        amount: 0
    });

    // State Validation & UI
    const errors = reactive({
        pageSize: '',
        title: '',
        description: '',
        amount: ''
    });
    const generalError = ref('');
    const isLoading = ref(false);
    const showSuccessToast = ref(false);

    // Reset form
    const resetForm = () => {
        formData.title = '';
        formData.description = '';
        formData.amount = 0;
        formData.pageSize = 'A4';
        
        // Clear errors
        Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '');
        generalError.value = '';
    };

    const clearError = (field: keyof typeof errors) => {
        errors[field] = '';
        generalError.value = '';
    };

    // Validation
    const validateForm = () => {
        let isValid = true;
        generalError.value = '';

        if (!formData.pageSize) {
            errors.pageSize = 'Ukuran halaman wajib dipilih';
            isValid = false;
        }

        if (!formData.title) {
            errors.title = 'Judul laporan tidak boleh kosong';
            isValid = false;
        } else if (formData.title.length < 5) {
            errors.title = 'Judul minimal 5 karakter';
            isValid = false;
        }

        if (formData.amount <= 0) {
            errors.amount = 'Nominal harus lebih dari 0';
            isValid = false;
        }

        if (!formData.description) {
            errors.description = 'Deskripsi tidak boleh kosong';
            isValid = false;
        } else if (formData.description.length < 10) {
            errors.description = 'Deskripsi minimal 10 karakter';
            isValid = false;
        }

        if (!isValid) {
            generalError.value = 'Mohon periksa kembali inputan Anda.';
        }

        return isValid;
    };

    // Fungsi Submit
    const handleSubmit = async () => {
        if (!validateForm()) return;

        isLoading.value = true;
        generalError.value = '';

        try {
            // API Call Simulation
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showSuccessToast.value = true;        
            console.log('Generating PDF with data:', toRaw(formData));

            resetForm();
            setTimeout(() => {
                showSuccessToast.value = false;
            }, 3000);

        } catch (err) {
            generalError.value = 'Terjadi kesalahan saat generate PDF.';
        } finally {
            isLoading.value = false;
        }
    };
</script>