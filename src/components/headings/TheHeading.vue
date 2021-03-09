<template>
  <nav id="the-heading">
    <h1 class="text-2xl font-medium pl-8 inline-block">
      <router-link to="/">OFlatmate</router-link>
    </h1>
    <div class="flex-grow"></div>
    <div class="flex" :class="{ 'pr-14': $route.name == 'home' }">
      <slot></slot>
    </div>
  </nav>
</template>
