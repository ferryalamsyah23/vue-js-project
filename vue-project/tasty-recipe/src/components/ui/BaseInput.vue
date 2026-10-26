<template>
  <div>
    <label :for="identity" class="fw-semibold">
      {{ label }} <span style="color: #cb3a31">*</span>
    </label>

    <!-- Isi dari dalam <base-input> tampil di sini -->
    <label :for="identity" class="d-block" style="cursor: pointer">
      <slot></slot>
    </label>

    <input
      :class="[{ 'd-none': isImage }, 'form-control']"
      :type="type"
      :id="identity"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="readonly === '1'"
      @input="onInput"
      @focus="emit('totalTimeFocus')"
    />
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, required: true },
  label: { type: String, required: true },
  identity: { type: String, required: true },
  placeholder: { type: String, required: false },
  modelValue: { type: String, required: false, default: "" },
  readonly: { type: String, required: false, default: "0" },
  isImage: { type: Boolean, required: false, default: false },
});

const emit = defineEmits(["update:modelValue", "keyInput", "totalTimeFocus"]);

const onInput = (event) => {
  emit("update:modelValue", event.target.value);
  emit("keyInput", event.target.value);
};
</script>