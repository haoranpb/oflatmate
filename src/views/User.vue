<template>
  <div id="user" class="flex-col">
    <div v-if="$user" class="flex flex-row w-full m-10 space-x-10">
      <vf-avatar-item middle :link="$user.photoURL" />
      <div class="mt-4">
        <h2 class="text-2xl font-medium">{{ $user.displayName }}</h2>
        <p class="text-gray-600">{{ $user.email }}</p>
      </div>
    </div>

    <router-view />
  </div>
</template>
