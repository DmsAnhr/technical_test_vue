<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 tracking-tight leading-none">
              PDF Report Generator
            </h1>
          </div>
        </div>
        
        <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
          <div class="size-2 rounded-full bg-green-500 animate-pulse"></div>
          <span class="text-sm font-medium text-gray-600">Frontend Test</span>
        </div>
      </div>
    </div>
  </header>
</template>