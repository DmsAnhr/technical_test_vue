<template>
  <div class="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-20">
    <AppHeader />

    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900">Form Section</h2>
        <p class="text-gray-500">Isi formulir di bawah ini untuk menghasilkan dokumen PDF secara otomatis.</p>
      </div>

      <section>
        <ReportForm />
      </section>

      <section class="space-y-4">
        <HistoryTable />
      </section>

    </main>
  </div>
</template>

<script setup>

</script>