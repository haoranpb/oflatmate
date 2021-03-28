<template>
  <div class="bg-white shadow-lg rounded-md w-64 mx-2 px-6 flex-shrink-0">
    <div class="py-3">
      <slot name="middle"></slot>
    </div>
    <div class="float-right h-14">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
