<template>
  <div class="space-y-1">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative rounded-md shadow-sm">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span class="text-gray-500 sm:text-sm">Rp</span>
      </div>
      <input
        type="text"
        :value="displayValue"
        @input="handleInput"
        @keydown="allowOnlyNumber"
        @blur="$emit('blur')" 
        class="block w-full rounded-md border pl-10 pr-3 py-2 text-gray-900 focus:ring-2 outline-none transition sm:text-sm"
        :class="[
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        ]"
        :placeholder="placeholder"
      />
    </div>
    <p v-if="error" class="text-xs text-red-500 mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        modelValue: { type: [Number, String], default: 0 },
        label: { type: String, default: '' },
        placeholder: { type: String, default: '0' },
        error: { type: Boolean, default: false },     
        errorMessage: { type: String, default: '' },  
        required: { type: Boolean, default: false }
    });

    const emit = defineEmits(['update:modelValue', 'blur']);

    const formatCurrency = (value: number | string) => {
        if (!value && value !== 0) return '';
        return new Intl.NumberFormat('id-ID').format(Number(value));
    };

    const displayValue = computed(() => formatCurrency(props.modelValue));

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const rawValue = target.value.replace(/\D/g, '');
        emit('update:modelValue', Number(rawValue));
    };

    // handle input only number
    const allowOnlyNumber = (event: KeyboardEvent) => {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'Tab'
        ];

        if (
            allowedKeys.includes(event.key) ||
            /^[0-9]$/.test(event.key)
        ) {
            return;
        }

        event.preventDefault();
    };

</script>