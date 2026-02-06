<template>
  <div class="space-y-1">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
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
        class="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition sm:text-sm"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        modelValue: {
            type: [Number, String],
            default: 0
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '0'
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const formatCurrency = (value: number | string) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID').format(Number(value));
    };

    const displayValue = computed(() => formatCurrency(props.modelValue));

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const rawValue = target.value.replace(/\D/g, '');
        
        emit('update:modelValue', Number(rawValue));
    };

    // handle input number only
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