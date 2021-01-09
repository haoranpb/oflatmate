<template>
  <nav id="the-heading">
    <h1 class="text-2xl font-medium pl-8 inline-block">
      <router-link to="/">Flatmate</router-link>
    </h1>
    <div class="flex-grow"></div>
    <div class="flex space-x-6">
      <slot></slot>
    </div>
  </nav>
</template>
