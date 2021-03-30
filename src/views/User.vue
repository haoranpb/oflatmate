<template>
  <div id="user" class="flex-col mx-20">
    <div v-if="$user" class="flex flex-row w-full mb-10 mt-5 space-x-6">
      <vf-avatar-item middle :link="$user.photoURL" />
      <div class="mt-1">
        <h2 class="text-xl font-medium">{{ $user.displayName }}</h2>
        <p class="text-gray-500">{{ $user.email }}</p>
      </div>
    </div>

    <router-view />
  </div>
</template>
