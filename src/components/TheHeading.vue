<template>
  <div id="the-heading">
    <h1 class="text-2xl font-medium pl-8 inline-block">
      <router-link to="/">Flatmate</router-link>
    </h1>
    <div class="flex-grow"></div>
    <!-- TODO: seperate into a dedicate component with responsive design -->
    <div class="flex space-x-6">
      <h2 class="text-lg text-gray-400 font-medium hover:text-gray-500">
        <router-link to="/signin">Sign In/Up</router-link>
      </h2>
      <h2 class="text-lg text-gray-400 font-medium hover:text-gray-500">
        <!-- active status: text-gray-600 -->
        <router-link to="/about">About</router-link>
      </h2>

      <!-- TODO: change url after publish -->
      <a
        href="https://github.com/ludanxer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fab fa-github fa-lg text-gray-400 hover:text-gray-500"></i>
      </a>
    </div>
  </div>
</template>
