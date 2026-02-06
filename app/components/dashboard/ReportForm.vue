<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition sm:text-sm bg-white"
                        >
                            <option value="A4">A4</option>
                            <option value="A5">A5</option>
                            <option value="Letter">Letter</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div class="col-span-1 md:col-span-3 space-y-1">
                    <label class="block text-sm font-medium text-gray-700">
                        Judul Laporan <span class="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        v-model="formData.title"
                        class="block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition sm:text-sm"
                        placeholder="Masukkan judul laporan..."
                        maxlength="100"
                        minlength="5"
                        required
                    />
                    <div class="flex justify-between text-xs text-gray-500">
                        <span>Min. 5 karakter</span>
                        <span>{{ formData.title.length }}/100</span>
                    </div>
                </div>
            </div>

            <div class="space-y-1">
                <CurrencyInput 
                    v-model="formData.amount"
                    label="Nominal (Rp)" 
                    placeholder="0"
                />
            </div>

            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">
                    Deskripsi / Isi Laporan <span class="text-red-500">*</span>
                </label>
                <textarea 
                    v-model="formData.description"
                    rows="4"
                    class="block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition sm:text-sm resize-y"
                    placeholder="Masukkan isi laporan..."
                    minlength="10"
                    required
                ></textarea>
            </div>

            <div class="flex justify-end pt-4 border-t border-gray-100">
                <button class="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Generate PDF
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    // State 
    const formData = reactive({
        pageSize: 'A4',
        title: '',
        description: '',
        amount: 0
    });
</script>